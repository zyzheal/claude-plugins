import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { createDebug } from './debug.js';

const debug = createDebug('resource');

// ============================================================
// CPU delta tracking (cross-process, file-based)
// ============================================================

const CACHE_DIR = path.join(os.tmpdir(), 'claude-hud');
const CPU_STATE_FILE = path.join(CACHE_DIR, 'cpu-state.json');

interface CpuState {
  pid: number;
  cpuTimeSec: number;
  wallMs: number;
}

function getCpuState(): CpuState | null {
  try {
    const raw = fs.readFileSync(CPU_STATE_FILE, 'utf8');
    return JSON.parse(raw) as CpuState;
  } catch {
    return null;
  }
}

function setCpuState(state: CpuState): void {
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CPU_STATE_FILE, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function getCpuStateForPid(pid: number): CpuState | null {
  try {
    const file = path.join(CACHE_DIR, `cpu-state-${pid}.json`);
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw) as CpuState;
  } catch {
    return null;
  }
}

function setCpuStateForPid(pid: number, cpuTimeSec: number, wallMs: number): void {
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    const file = path.join(CACHE_DIR, `cpu-state-${pid}.json`);
    fs.writeFileSync(file, JSON.stringify({ pid, cpuTimeSec, wallMs }));
  } catch {
    // ignore
  }
}

/**
 * Parse cumulative CPU time (seconds) for a process.
 * macOS: `ps -o time=` → M:SS.ss or H:MM:SS or D-HH:MM:SS
 * Linux: `/proc/[pid]/stat` fields 14+15 → (utime+stime)/clk_tck
 */
function getCpuTimeSec(pid: number): number {
  if (process.platform === 'darwin') {
    const out = execSync(`ps -o time= -p ${pid} 2>/dev/null`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 500,
    }).trim();
    // Handle D-HH:MM:SS (days prefix)
    const daysPart = out.includes('-') ? parseInt(out.split('-')[0], 10) * 86400 : 0;
    const timeStr = out.includes('-') ? out.split('-')[1] : out;
    const parts = timeStr.split(':');
    let seconds = daysPart;
    if (parts.length === 3) {
      seconds += parseInt(parts[0], 10) * 3600 + parseInt(parts[1], 10) * 60 + parseFloat(parts[2]);
    } else if (parts.length === 2) {
      seconds += parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
    }
    return seconds;
  }

  // Linux
  try {
    const stat = fs.readFileSync(`/proc/${pid}/stat`, 'utf8');
    const fields = stat.split(/\s+/);
    const utime = parseInt(fields[13], 10);
    const stime = parseInt(fields[14], 10);
    const clkTck = 100; // standard Linux HZ
    return (utime + stime) / clkTck;
  } catch {
    return 0;
  }
}

/**
 * Compute instantaneous CPU % by comparing current cumulative CPU time
 * with the cached value from the previous HUD invocation.
 */
function computeCpuPercent(claudePid: number): number {
  const prev = getCpuState();
  const nowCpuTime = getCpuTimeSec(claudePid);
  const nowWall = Date.now();

  if (prev && prev.pid === claudePid && prev.cpuTimeSec >= 0) {
    const cpuDeltaMs = (nowCpuTime - prev.cpuTimeSec) * 1000;
    const wallDeltaMs = nowWall - prev.wallMs;
    if (wallDeltaMs > 50) {
      const cpuPercent = (cpuDeltaMs / wallDeltaMs) * 100;
      setCpuState({ pid: claudePid, cpuTimeSec: nowCpuTime, wallMs: nowWall });
      return Math.round(cpuPercent * 10) / 10;
    }
  }

  setCpuState({ pid: claudePid, cpuTimeSec: nowCpuTime, wallMs: nowWall });
  return 0;
}

export interface ResourceData {
  cpuPercent: number;
  memoryMB: number;
  memoryPercent: number;
  pid: number;
}

// ============================================================
// Shared utilities
// ============================================================

function parseMemoryValue(str: string): number {
  const trimmed = str.trim().toUpperCase();
  const match = trimmed.match(/^([\d.]+)\s*([GMK]?)B?$/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2];

  switch (unit) {
    case 'G': return value * 1024;
    case 'M': return value;
    case 'K': return value / 1024;
    default: return value / (1024 * 1024);
  }
}

/**
 * Check if a process is the Claude Code root by examining its cmdline.
 * Looks for 'claude' binary (not just any process with 'claude' in args).
 */
function isClaudeCodeProcess(pid: number): boolean {
  try {
    // macOS/BSD: use ps -o comm= for the short command name
    const comm = execSync(`ps -o comm= -p ${pid}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 500,
    }).trim().toLowerCase();

    if (comm === 'claude') return true;

    // Check full args for 'claude-code' or node/bun running claude
    const args = execSync(`ps -o args= -p ${pid}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 500,
    }).trim().toLowerCase();

    // Match: "claude --resume", "node .../claude-code/dist/cli.js", etc.
    // But exclude: processes that just have "claude" in their working dir name
    if (/claude-code/.test(args)) return true;
    if (/claude-code/.test(comm)) return true;

    return false;
  } catch {
    return false;
  }
}

/**
 * Find the Claude Code root process by walking up the process tree.
 * The HUD is spawned as: Claude Code -> zsh/bash -> bun (HUD)
 *
 * **Multi-instance safety:**
 * Walk-up is deterministic — it traces from the HUD's direct parent
 * up through the process tree, so it always finds the correct Claude
 * instance even when multiple Claude terminals are open.
 *
 * Only falls back to pgrep if walk-up fails entirely, and even then
 * tries to match by parent PID group.
 */
function findClaudeCodePid(startPid: number): number | null {
  let current = startPid;
  const visited = new Set<number>();

  while (current > 0 && !visited.has(current)) {
    visited.add(current);

    if (isClaudeCodeProcess(current)) {
      return current;
    }

    try {
      const ppidStr = execSync(`ps -o ppid= -p ${current}`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 500,
      }).trim();

      const ppid = parseInt(ppidStr, 10);
      if (isNaN(ppid) || ppid <= 1) break;
      current = ppid;
    } catch {
      break;
    }
  }

  // Fallback: multiple Claude instances — find the one in our process group
  try {
    // Get our process group ID
    const ourPgid = execSync(`ps -o pgid= -p ${startPid}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 500,
    }).trim();
    const ourPgidNum = parseInt(ourPgid, 10);

    if (!isNaN(ourPgidNum)) {
      // Find Claude process in the same process group
      const pgrepOut = execSync('pgrep -x claude 2>/dev/null', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
        timeout: 500,
      }).trim();

      for (const line of pgrepOut.split('\n')) {
        const pid = parseInt(line.trim(), 10);
        if (isNaN(pid)) continue;

        const pgid = execSync(`ps -o pgid= -p ${pid}`, {
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'pipe'],
          timeout: 500,
        }).trim();

        if (parseInt(pgid, 10) === ourPgidNum) {
          return pid;
        }
      }
    }

    // Last resort: return first Claude process
    const firstOut = execSync('pgrep -x claude 2>/dev/null | head -1', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 500,
    }).trim();
    const first = parseInt(firstOut, 10);
    if (!isNaN(first)) return first;
  } catch {
    // ignore
  }

  return null;
}

// ============================================================
// macOS: `top -l 1` for physFootprint (matches Activity Monitor)
// ============================================================

function getResourceMacOS(): ResourceData | null {
  const claudePid = findClaudeCodePid(process.ppid);
  if (!claudePid) return null;

  // Primary: top -l 1 MEM column (= physFootprint)
  try {
    const topOutput = execSync('top -l 1 2>/dev/null', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 3000,
    });

    let memColIndex = -1;

    for (const line of topOutput.split('\n')) {
      const parts = line.trim().split(/\s+/);

      // Parse header to find column indices
      if (parts[0] === 'PID' && parts[1] === 'COMMAND') {
        for (let i = 0; i < parts.length; i++) {
          if (parts[i] === 'MEM') memColIndex = i;
        }
        continue;
      }

      // Match our PID
      if (parts[0] === String(claudePid) && memColIndex >= 0) {
        const memStr = parts[memColIndex];
        const memoryMB = parseMemoryValue(memStr);

        // Get %mem from ps
        let memoryPercent = 0;
        try {
          const psOut = execSync(`ps -o %mem= -p ${claudePid}`, {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe'],
            timeout: 500,
          }).trim();
          memoryPercent = parseFloat(psOut) || 0;
        } catch {
          // ignore
        }

        if (memoryMB > 0) {
          const cpuPercent = computeCpuPercent(claudePid);
          return {
            cpuPercent: Math.round(cpuPercent * 10) / 10,
            memoryMB,
            memoryPercent: Math.round(memoryPercent * 100) / 100,
            pid: claudePid,
          };
        }
      }
    }
  } catch {
    debug('top command failed on macOS');
  }

  // Fallback: ps rss
  return getResourceMacOSFallback(claudePid);
}

function getResourceMacOSFallback(pid: number): ResourceData | null {
  try {
    const output = execSync(`ps -o %mem=,rss= -p ${pid} 2>/dev/null`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 1000,
    }).trim();

    const parts = output.trim().split(/\s+/).map(Number);
    if (parts.length < 2 || parts.some(isNaN)) return null;

    const [memoryPercent, rssKB] = parts;
    const cpuPercent = computeCpuPercent(pid);

    return {
      cpuPercent: Math.round(cpuPercent * 10) / 10,
      memoryMB: Math.round((rssKB / 1024) * 10) / 10,
      memoryPercent: Math.round(memoryPercent * 100) / 100,
      pid,
    };
  } catch {
    return null;
  }
}

// ============================================================
// Linux: /proc filesystem
// ============================================================

function getResourceLinux(): ResourceData | null {
  try {
    const claudePid = findClaudeCodePidLinux(process.ppid);
    if (!claudePid) return null;

    const allPids = new Set<number>();
    allPids.add(claudePid);
    getChildrenLinux(claudePid, allPids);

    let totalRssPages = 0;
    let totalMemPercent = 0;
    let totalCpuTimeSec = 0;
    const pageSize = getPageSizeLinux();

    for (const pid of allPids) {
      try {
        const statm = fs.readFileSync(`/proc/${pid}/statm`, 'utf8').trim();
        const rssPages = parseInt(statm.split(/\s+/)[1], 10);
        if (!isNaN(rssPages)) {
          totalRssPages += rssPages;
        }
      } catch {
        // Process may have exited
      }

      try {
        totalCpuTimeSec += getCpuTimeSec(pid);
        const psOut = execSync(`ps -o %mem= -p ${pid} 2>/dev/null`, {
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'pipe'],
          timeout: 500,
        }).trim();
        const memVal = parseFloat(psOut);
        if (!isNaN(memVal)) {
          totalMemPercent += memVal;
        }
      } catch {
        // ignore
      }
    }

    const memoryMB = Math.round((totalRssPages * pageSize / 1024 / 1024) * 10) / 10;
    if (memoryMB === 0) return null;

    // Compute CPU from delta
    let cpuPercent = 0;
    for (const pid of allPids) {
      const prev = getCpuStateForPid(pid);
      const nowCpu = getCpuTimeSec(pid);
      const nowWall = Date.now();
      if (prev && prev.pid === pid && prev.cpuTimeSec >= 0) {
        const cpuDelta = (nowCpu - prev.cpuTimeSec) * 1000;
        const wallDelta = nowWall - prev.wallMs;
        if (wallDelta > 50) {
          cpuPercent += (cpuDelta / wallDelta) * 100;
        }
      }
      setCpuStateForPid(pid, nowCpu, nowWall);
    }

    return {
      cpuPercent: Math.round(cpuPercent * 10) / 10,
      memoryMB,
      memoryPercent: Math.round(totalMemPercent * 100) / 100,
      pid: claudePid,
    };
  } catch (error) {
    debug('getResourceLinux failed:', error);
    return null;
  }
}

function findClaudeCodePidLinux(startPid: number): number | null {
  let current = startPid;
  const visited = new Set<number>();

  while (current > 0 && !visited.has(current)) {
    visited.add(current);

    try {
      const cmdline = fs.readFileSync(`/proc/${current}/cmdline`, 'utf8').replace(/\0/g, ' ').trim();
      if (/claude-code/.test(cmdline)) return current;

      const status = fs.readFileSync(`/proc/${current}/status`, 'utf8');
      const ppidMatch = status.match(/^PPid:\s+(\d+)$/m);
      if (!ppidMatch) break;
      const ppid = parseInt(ppidMatch[1], 10);
      if (isNaN(ppid) || ppid <= 1) break;
      current = ppid;
    } catch {
      break;
    }
  }

  // Fallback: scan /proc
  try {
    const allPids = fs.readdirSync('/proc').filter(d => /^\d+$/.test(d)).map(Number);
    for (const pid of allPids) {
      try {
        const comm = fs.readFileSync(`/proc/${pid}/comm`, 'utf8').trim();
        if (comm === 'claude') return pid;
        const cmdline = fs.readFileSync(`/proc/${pid}/cmdline`, 'utf8').replace(/\0/g, ' ').toLowerCase();
        if (/claude-code/.test(cmdline)) return pid;
      } catch {
        // ignore
      }
    }
  } catch {
    // ignore
  }

  return null;
}

function getChildrenLinux(parentPid: number, result: Set<number>): void {
  try {
    const children = fs.readFileSync(`/proc/${parentPid}/children`, 'utf8').trim();
    if (children) {
      for (const childStr of children.split(/\s+/)) {
        const childPid = parseInt(childStr, 10);
        if (!isNaN(childPid) && !result.has(childPid)) {
          result.add(childPid);
          getChildrenLinux(childPid, result);
        }
      }
      return;
    }
  } catch {
    // children file may not exist
  }

  try {
    const allPids = fs.readdirSync('/proc').filter(d => /^\d+$/.test(d));
    for (const pidStr of allPids) {
      const pid = parseInt(pidStr, 10);
      if (result.has(pid)) continue;
      try {
        const status = fs.readFileSync(`/proc/${pid}/status`, 'utf8');
        const ppidMatch = status.match(/^PPid:\s+(\d+)$/m);
        if (ppidMatch && parseInt(ppidMatch[1], 10) === parentPid) {
          result.add(pid);
          getChildrenLinux(pid, result);
        }
      } catch {
        // ignore
      }
    }
  } catch {
    // ignore
  }
}

function getPageSizeLinux(): number {
  try {
    return parseInt(fs.readFileSync('/proc/sys/vm/page-size', 'utf8').trim(), 10);
  } catch {
    return 4096;
  }
}

// ============================================================
// Windows: PowerShell Get-Process
// ============================================================

function getResourceWindows(): ResourceData | null {
  try {
    const psScript = `
      $procs = Get-Process -Name "node","bun","claude","code" -ErrorAction SilentlyContinue
      if (-not $procs) { exit 1 }
      foreach ($p in $procs) {
        $cmd = (Get-CimInstance Win32_Process -Filter "ProcessId=$($p.Id)").CommandLine
        if ($cmd -match "claude-code") {
          Write-Output "$($p.Id) $($p.CPU) $($p.WorkingSet64)"
          exit 0
        }
      }
      $p = $procs[0]
      Write-Output "$($p.Id) $($p.CPU) $($p.WorkingSet64)"
    `;

    const output = execSync(`powershell -NoProfile -Command "${psScript}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 5000,
    }).trim();

    const parts = output.split(/\s+/);
    if (parts.length < 3) return null;

    const pid = parseInt(parts[0], 10);
    const cpuPercent = parseFloat(parts[1]) || 0;
    const workingSetBytes = parseInt(parts[2], 10) || 0;

    if (workingSetBytes === 0) return null;

    const totalMemBytes = os.totalmem();
    const memoryMB = Math.round((workingSetBytes / 1024 / 1024) * 10) / 10;
    const memoryPercent = (workingSetBytes / totalMemBytes) * 100;

    return {
      cpuPercent: Math.round(cpuPercent * 10) / 10,
      memoryMB,
      memoryPercent: Math.round(memoryPercent * 100) / 100,
      pid,
    };
  } catch (error) {
    debug('getResourceWindows failed:', error);
    return null;
  }
}

// ============================================================
// Public API
// ============================================================

/**
 * Get Claude Code process resource usage.
 *
 * Cross-platform implementation:
 *
 * | Platform | Method | Metric | Speed | Matches |
 * |----------|--------|--------|-------|---------|
 * | macOS | `top -l 1` MEM | physFootprint | ~700ms | Activity Monitor |
 * | macOS (fallback) | `ps -o rss` | RSS | ~5ms | `ps` standard |
 * | Linux | `/proc/[pid]/statm` | RSS | <1ms | `ps` standard |
 * | Windows | `Get-Process` | WorkingSet64 | ~200ms | Task Manager |
 */
export function getResourceData(): ResourceData | null {
  switch (process.platform) {
    case 'darwin':
      return getResourceMacOS();
    case 'linux':
      return getResourceLinux();
    case 'win32':
      return getResourceWindows();
    default:
      debug('Unsupported platform:', process.platform);
      return null;
  }
}
