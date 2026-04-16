import { yellow, dim, RESET, green } from './colors.js';

export function formatResourceBar(value: number, max: number, width: number): string {
  const ratio = Math.min(value / max, 1);
  const filled = Math.round(ratio * width);
  const empty = width - filled;

  const color = ratio > 0.8 ? yellow : green;
  return `${color('\u2588'.repeat(Math.max(filled, 0)))}${dim('\u2591'.repeat(Math.max(empty, 0)))}${RESET}`;
}
