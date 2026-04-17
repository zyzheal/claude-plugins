import { cyan, dim, green, yellow } from './colors.js';
/**
 * Renders the dev-engine requirement/feature progress line.
 * Format: [status] requirement → current feature  X/N features
 */
export function renderDevEngineLine(ctx) {
    if (!ctx.devEngine) {
        return null;
    }
    const { requirementName, requirementStatus, currentFeatureName, featureTotal, featureDone, lastLog } = ctx.devEngine;
    if (!requirementName) {
        return null;
    }
    const parts = [];
    const statusLabel = requirementStatus ? dim(`[${requirementStatus}]`) : '';
    const reqPart = cyan(requirementName);
    const featureStr = currentFeatureName ? ` → ${yellow(currentFeatureName)}` : '';
    const progressStr = featureTotal > 0
        ? `${featureDone === featureTotal ? green(`${featureDone}/${featureTotal}`) : `${featureDone}/${featureTotal}`} features`
        : '';
    parts.push(`${statusLabel} ${reqPart}${featureStr}  ${progressStr}`.trim());
    if (lastLog) {
        const short = lastLog.length > 60 ? lastLog.slice(0, 59) + '…' : lastLog;
        parts.push(dim(`↳ ${short}`));
    }
    return parts.join('\n');
}
//# sourceMappingURL=dev-engine-line.js.map