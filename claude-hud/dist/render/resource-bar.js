import { yellow, green, RESET } from './colors.js';
const EMPTY_BLOCK = '\u2591';
export function formatResourceBar(value, max, width) {
    const ratio = Math.min(value / max, 1);
    const filled = Math.round(ratio * width);
    const empty = width - filled;
    const color = ratio > 0.8 ? yellow : green;
    const emptyColor = ratio > 0.8 ? yellow : green;
    return `${color('\u2588'.repeat(Math.max(filled, 0)))}${emptyColor(EMPTY_BLOCK.repeat(Math.max(empty, 0)))}${RESET}`;
}
//# sourceMappingURL=resource-bar.js.map