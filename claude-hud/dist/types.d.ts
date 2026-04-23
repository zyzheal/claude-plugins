import type { HudConfig } from './config.js';
import type { GitStatus } from './git.js';
import type { ResourceData } from './resource-monitor.js';
/** Process metrics from Claude Code v2.2.0+ */
export interface ProcessInfo {
    pid: number;
    memory: {
        rss: number;
        heap_total: number;
        heap_used: number;
        external: number;
        array_buffers: number;
    };
}
export interface StdinData {
    transcript_path?: string;
    cwd?: string;
    session_id?: string;
    model?: {
        id?: string;
        display_name?: string;
    };
    context_window?: {
        context_window_size?: number;
        current_usage?: {
            input_tokens?: number;
            output_tokens?: number;
            cache_creation_input_tokens?: number;
            cache_read_input_tokens?: number;
        } | null;
        used_percentage?: number | null;
        remaining_percentage?: number | null;
    };
    process?: ProcessInfo;
}
export interface ToolEntry {
    id: string;
    name: string;
    target?: string;
    status: 'running' | 'completed' | 'error';
    startTime: Date;
    endTime?: Date;
}
export interface AgentEntry {
    id: string;
    type: string;
    model?: string;
    description?: string;
    status: 'running' | 'completed';
    startTime: Date;
    endTime?: Date;
}
export interface TodoItem {
    content: string;
    status: 'pending' | 'in_progress' | 'completed';
}
/** Usage window data from the OAuth API */
export interface UsageWindow {
    utilization: number | null;
    resetAt: Date | null;
}
export interface UsageData {
    planName: string | null;
    fiveHour: number | null;
    sevenDay: number | null;
    fiveHourResetAt: Date | null;
    sevenDayResetAt: Date | null;
    apiUnavailable?: boolean;
    apiError?: string;
}
/** Check if usage limit is reached (either window at 100%) */
export declare function isLimitReached(data: UsageData): boolean;
export interface TranscriptData {
    tools: ToolEntry[];
    agents: AgentEntry[];
    todos: TodoItem[];
    sessionStart?: Date;
    sessionName?: string;
}
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
export interface RenderContext {
    stdin: StdinData;
    transcript: TranscriptData;
    claudeMdCount: number;
    rulesCount: number;
    mcpCount: number;
    hooksCount: number;
    sessionDuration: string;
    gitStatus: GitStatus | null;
    usageData: UsageData | null;
    resourceData: ResourceData | null;
    config: HudConfig;
    extraLabel: string | null;
    progress: ProgressData | null;
}
//# sourceMappingURL=types.d.ts.map