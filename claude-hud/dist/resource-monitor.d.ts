import type { StdinData } from './types.js';
export interface ResourceData {
    cpuPercent: number;
    memoryMB: number;
    memoryPercent: number;
    pid: number;
}
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
export interface StdinProcessInfo {
    pid: number;
    memory: {
        rss: number;
        heap_total: number;
        heap_used: number;
        external: number;
        array_buffers: number;
    };
}
/**
 * Get resource data using stdin-provided PID and memory (v2.2.0+).
 * When Claude Code/ola-cc passes process metrics via stdin, use them directly
 * for instant, accurate per-session data without process tree traversal.
 */
export declare function getResourceDataFromStdin(stdin: StdinData): ResourceData | null;
export declare function getResourceData(stdin?: StdinData): ResourceData | null;
//# sourceMappingURL=resource-monitor.d.ts.map