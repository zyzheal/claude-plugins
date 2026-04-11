import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Unified progress tracker for multiple plugin components:
 * - long-running-agent: feature_list.json, claude-progress.txt (root level)
 * - dev-enegine: .dev-enegine/requirements/manifest.json, feature_list.json
 * - architect-collaboration: docs/requirements.md, docs/tech-design.md, docs/开发任务.md
 */

export interface ProgressData {
  source: 'long-running-agent' | 'dev-enegine' | 'architect-collaboration';
  projectName: string | null;
  phase: string | null;
  phaseLabel: string | null;
  completed: number;
  total: number;
  currentTask: string | null;
  lastLog: string | null;
}

function readJSON(filePath: string): unknown {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function readLastLines(filePath: string, n = 5): string[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const lines = raw.trim().split('\n').filter(Boolean);
    return lines.slice(-n);
  } catch {
    return [];
  }
}

function readFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

interface Feature {
  id?: string;
  name?: string;
  passes?: boolean;
  blocked?: boolean;
}

interface FeatureList {
  features?: Feature[];
}

interface DevEngineManifestRequirement {
  id?: string;
  dir?: string;
  name?: string;
  description?: string;
  status?: string;
}

interface DevEngineManifest {
  requirements?: DevEngineManifestRequirement[];
}

/**
 * Check for long-running-agent progress (root level files)
 */
function getLongRunningAgentProgress(cwd: string): ProgressData | null {
  const featureListPath = path.join(cwd, 'feature_list.json');
  const featureList = readJSON(featureListPath) as FeatureList | null;

  if (!featureList?.features?.length) {
    return null;
  }

  const features = featureList.features;
  const total = features.length;
  const completed = features.filter((f) => f.passes === true).length;

  let currentTask: string | null = null;
  const inProgress = features.find((f) => !f.passes && !f.blocked);
  if (inProgress) {
    currentTask = inProgress.name || inProgress.id || null;
  } else if (completed === total && total > 0) {
    currentTask = 'All done';
  }

  const progressLogPath = path.join(cwd, 'claude-progress.txt');
  const logs = readLastLines(progressLogPath, 10);
  const lastLog = logs.length > 0 ? logs[logs.length - 1].replace(/^\[.*?\]\s*/, '') : null;

  let projectName: string | null = null;
  for (const line of logs) {
    const match = line.match(/#\s*项目 [::]\s*(.+)/);
    if (match) {
      projectName = match[1].trim();
      break;
    }
  }
  if (!projectName) {
    projectName = path.basename(cwd);
  }

  return {
    source: 'long-running-agent',
    projectName: truncate(projectName, 20),
    phase: 'developing',
    phaseLabel: `Feature ${completed}/${total}`,
    completed,
    total,
    currentTask: truncate(currentTask, 30),
    lastLog,
  };
}

/**
 * Check for dev-enegine progress (.dev-enegine directory)
 */
function getDevEngineProgress(cwd: string): ProgressData | null {
  const manifestPath = path.join(cwd, '.dev-enegine/requirements/manifest.json');
  const manifest = readJSON(manifestPath) as DevEngineManifest | null;

  if (!manifest?.requirements?.length) {
    return null;
  }

  const reqs = manifest.requirements;
  const developing = reqs.find((r) => r.status === 'developing');
  const planning = reqs.find((r) => r.status === 'planning');
  const target = developing || planning || reqs[reqs.length - 1];

  if (!target) {
    return null;
  }

  const reqId = target.id || target.dir;
  const projectName = target.name || target.description || reqId || path.basename(cwd);

  let total = 0;
  let completed = 0;
  let currentTask: string | null = null;
  let phase = target.status || 'unknown';

  const featurePath = reqId
    ? path.join(cwd, `.dev-enegine/requirements/${reqId}/feature_list.json`)
    : null;
  const featureList = featurePath ? readJSON(featurePath) as FeatureList | null : null;

  if (featureList?.features && Array.isArray(featureList.features)) {
    const features = featureList.features;
    total = features.length;
    completed = features.filter((f) => f.passes === true).length;

    const inProgress = features.find((f) => !f.passes && !f.blocked);
    if (inProgress) {
      currentTask = inProgress.name || inProgress.id || null;
    } else if (completed === total && total > 0) {
      currentTask = 'All done';
    }
  }

  const progressLogPath = path.join(cwd, '.dev-enegine/claude-progress.txt');
  const logs = readLastLines(progressLogPath, 5);
  const lastLog = logs.length > 0 ? logs[logs.length - 1].replace(/^\[.*?\]\s*/, '') : null;

  return {
    source: 'dev-enegine',
    projectName: truncate(projectName, 20),
    phase,
    phaseLabel: phase === 'completed' ? 'Completed' : (phase === 'planning' ? 'Planning' : 'Developing'),
    completed,
    total,
    currentTask: truncate(currentTask, 30),
    lastLog,
  };
}

/**
 * Check for architect-collaboration progress (docs/ directory)
 */
function getArchitectCollaborationProgress(cwd: string): ProgressData | null {
  const docsDir = path.join(cwd, 'docs');
  if (!fs.existsSync(docsDir)) {
    return null;
  }

  const requirementsPath = path.join(docsDir, 'requirements.md');
  const techDesignPath = path.join(docsDir, 'tech-design.md');
  const taskListPath = path.join(docsDir, '开发任务.md');

  // Check if any architect-collaboration files exist
  const hasRequirements = fs.existsSync(requirementsPath);
  const hasTechDesign = fs.existsSync(techDesignPath);
  const hasTaskList = fs.existsSync(taskListPath);

  if (!hasRequirements && !hasTechDesign && !hasTaskList) {
    return null;
  }

  // Determine phase based on available files
  let phase = 'unknown';
  let phaseLabel = 'Unknown';
  let projectName: string | null = null;

  if (hasRequirements) {
    phase = 'requirements';
    phaseLabel = 'Requirements';
    const content = readFile(requirementsPath);
    if (content) {
      const projectMatch = content.match(/#\s*(.+)/);
      if (projectMatch) {
        projectName = projectMatch[1].trim();
      }
    }
  }

  if (hasTechDesign) {
    phase = 'design';
    phaseLabel = 'Technical Design';
    if (!projectName) {
      const content = readFile(techDesignPath);
      if (content) {
        const projectMatch = content.match(/#\s*(.+)/);
        if (projectMatch) {
          projectName = projectMatch[1].trim();
        }
      }
    }
  }

  if (hasTaskList) {
    phase = 'task-breakdown';
    phaseLabel = 'Task Breakdown';
    if (!projectName) {
      const content = readFile(taskListPath);
      if (content) {
        const projectMatch = content.match(/#\s*(.+)/);
        if (projectMatch) {
          projectName = projectMatch[1].trim();
        }
      }
    }
  }

  // Parse task list if available
  let total = 0;
  let completed = 0;
  let currentTask: string | null = null;

  if (hasTaskList) {
    const content = readFile(taskListPath);
    if (content) {
      const lines = content.split('\n');
      for (const line of lines) {
        // Match task items like "- [x]" or "- [ ]"
        const completedMatch = line.match(/-\s*\[([ x])\]/);
        if (completedMatch) {
          total++;
          if (completedMatch[1] === 'x') {
            completed++;
          }
        }
      }

      // Find current task (first incomplete one)
      for (const line of lines) {
        const taskMatch = line.match(/-\s*\[\s*\]\s*(.+)/);
        if (taskMatch) {
          currentTask = taskMatch[1].trim();
          break;
        }
      }

      if (completed === total && total > 0) {
        currentTask = 'All done';
        phase = 'completed';
        phaseLabel = 'Completed';
      }
    }
  }

  // Also check for implementation phase (if code exists)
  const srcExists = fs.existsSync(path.join(cwd, 'src')) || fs.existsSync(path.join(cwd, 'app'));
  if (srcExists && phase === 'task-breakdown' && completed > 0) {
    phase = 'implementation';
    phaseLabel = 'Implementation';
  }

  const progressLogPath = path.join(docsDir, 'progress.md');
  let lastLog: string | null = null;
  if (fs.existsSync(progressLogPath)) {
    const logs = readLastLines(progressLogPath, 3);
    lastLog = logs.length > 0 ? logs[logs.length - 1] : null;
  }

  return {
    source: 'architect-collaboration',
    projectName: projectName ? truncate(projectName, 20) : null,
    phase,
    phaseLabel,
    completed,
    total,
    currentTask: truncate(currentTask, 30),
    lastLog,
  };
}

function truncate(str: string | null, maxLen: number): string | null {
  if (!str) return null;
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + '…';
}

/**
 * Get unified progress data from any supported plugin component.
 * Priority: long-running-agent > dev-enegine > architect-collaboration
 */
export function getProgressData(cwd?: string): ProgressData | null {
  const dir = cwd || process.cwd();

  // Try each source in priority order
  const lraData = getLongRunningAgentProgress(dir);
  if (lraData) return lraData;

  const deData = getDevEngineProgress(dir);
  if (deData) return deData;

  const acData = getArchitectCollaborationProgress(dir);
  if (acData) return acData;

  return null;
}
