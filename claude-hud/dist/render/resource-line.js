import { bold, green } from './colors.js';
import { formatResourceBar } from './resource-bar.js';
export function renderResourceLine(ctx) {
    const resource = ctx.resourceData;
    if (!resource) {
        return null;
    }
    const parts = [];
    // CPU: ◉ CPU ████░░░░░░ 42.3%
    const cpuBar = formatResourceBar(resource.cpuPercent, 100, 10);
    parts.push(`${bold('◉')} CPU ${cpuBar} ${resource.cpuPercent}%`);
    // Memory: ◉ MEM ███░░░░░░░ 128.5MB (2.4%)
    const memBar = formatResourceBar(resource.memoryPercent, 50, 10);
    parts.push(`${bold('◉')} MEM ${memBar} ${resource.memoryMB}MB (${resource.memoryPercent}%)`);
    // PID
    parts.push(`PID ${resource.pid}`);
    return green(parts.join(' \u2502 '));
}
//# sourceMappingURL=resource-line.js.map