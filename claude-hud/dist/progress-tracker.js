import * as fs from 'node:fs';
import * as path from 'node:path';
function readJSON(filePath) {
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
function readLastLines(filePath, n = 5) {
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const lines = raw.trim().split('\n').filter(Boolean);
        return lines.slice(-n);
    }
    catch {
        return [];
    }
}
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch {
        return null;
    }
}
/**
 * Check for long-running-agent progress (root level files)
 */
function getLongRunningAgentProgress(cwd) {
    const featureListPath = path.join(cwd, 'feature_list.json');
    const featureList = readJSON(featureListPath);
    if (!featureList?.features?.length) {
        return null;
    }
    const features = featureList.features;
    const total = features.length;
    const completed = features.filter((f) => f.passes === true).length;
    let currentTask = null;
    const inProgress = features.find((f) => !f.passes && !f.blocked);
    if (inProgress) {
        currentTask = inProgress.name || inProgress.id || null;
    }
    else if (completed === total && total > 0) {
        currentTask = 'All done';
    }
    const progressLogPath = path.join(cwd, 'claude-progress.txt');
    const logs = readLastLines(progressLogPath, 10);
    const lastLog = logs.length > 0 ? logs[logs.length - 1].replace(/^\[.*?\]\s*/, '') : null;
    let projectName = null;
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
function getDevEngineProgress(cwd) {
    const manifestPath = path.join(cwd, '.dev-enegine/requirements/manifest.json');
    const manifest = readJSON(manifestPath);
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
    let currentTask = null;
    let phase = target.status || 'unknown';
    const featurePath = reqId
        ? path.join(cwd, `.dev-enegine/requirements/${reqId}/feature_list.json`)
        : null;
    const featureList = featurePath ? readJSON(featurePath) : null;
    if (featureList?.features && Array.isArray(featureList.features)) {
        const features = featureList.features;
        total = features.length;
        completed = features.filter((f) => f.passes === true).length;
        const inProgress = features.find((f) => !f.passes && !f.blocked);
        if (inProgress) {
            currentTask = inProgress.name || inProgress.id || null;
        }
        else if (completed === total && total > 0) {
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
function getArchitectCollaborationProgress(cwd) {
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
    let projectName = null;
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
    let currentTask = null;
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
    let lastLog = null;
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
function truncate(str, maxLen) {
    if (!str)
        return null;
    if (str.length <= maxLen)
        return str;
    return str.slice(0, maxLen - 1) + '…';
}
/**
 * Get unified progress data from any supported plugin component.
 * Priority: long-running-agent > dev-enegine > architect-collaboration
 */
export function getProgressData(cwd) {
    const dir = cwd || process.cwd();
    // Try each source in priority order
    const lraData = getLongRunningAgentProgress(dir);
    if (lraData)
        return lraData;
    const deData = getDevEngineProgress(dir);
    if (deData)
        return deData;
    const acData = getArchitectCollaborationProgress(dir);
    if (acData)
        return acData;
    return null;
}
//# sourceMappingURL=progress-tracker.js.map