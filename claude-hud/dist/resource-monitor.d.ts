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
export declare function getResourceData(): ResourceData | null;
//# sourceMappingURL=resource-monitor.d.ts.map