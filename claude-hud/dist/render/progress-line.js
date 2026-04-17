import { cyan, dim, green, yellow } from './colors.js';
/**
 * Renders the unified progress line for multiple plugin components.
 * Format: [phase] projectName → currentTask  X/Y features
 */
export function renderProgressLine(ctx) {
    if (!ctx.progress) {
        return null;
    }
    const { source, projectName, phaseLabel, currentTask, completed, total } = ctx.progress;
    if (!projectName && total === 0) {
        return null;
    }
    const parts = [];
    // Source icon
    const sourceIcon = source === 'long-running-agent' ? '🚀' :
        source === 'dev-enegine' ? '⚙️' :
            source === 'architect-collaboration' ? '📐' : '·';
    // Phase label
    const phaseStr = phaseLabel ? dim(`[${phaseLabel}]`) : '';
    // Project name
    const namePart = projectName ? cyan(projectName) : '';
    // Current task
    const taskStr = currentTask ? ` → ${yellow(currentTask)}` : '';
    // Progress
    const progressStr = total > 0
        ? `  ${completed === total ? green(`${completed}/${total}`) : dim(`${completed}/${total}`)}`
        : '';
    parts.push(`${sourceIcon} ${phaseStr} ${namePart}${taskStr}${progressStr}`.trim());
    return parts.join('');
}
//# sourceMappingURL=progress-line.js.map