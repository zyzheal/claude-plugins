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
/**
 * Get unified progress data from any supported plugin component.
 * Priority: long-running-agent > dev-enegine > architect-collaboration
 */
export declare function getProgressData(cwd?: string): ProgressData | null;
//# sourceMappingURL=progress-tracker.d.ts.map