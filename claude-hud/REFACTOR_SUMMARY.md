# Claude HUD 插件改造总结

## 改造概述

本次改造将 Claude HUD 的进度追踪功能从单一支持 `dev-enegine` 扩展为统一支持多个插件组件的进度输出。

## 主要变更

### 1. 新增文件

#### `src/progress-tracker.ts` (339 行)
统一的进度追踪模块，支持三种插件：
- **long-running-agent**: 读取根目录的 `feature_list.json` 和 `claude-progress.txt`
- **dev-enegine**: 读取 `.dev-enegine/requirements/manifest.json` 和 `feature_list.json`
- **architect-collaboration**: 读取 `docs/` 目录下的 `requirements.md`, `tech-design.md`, `开发任务.md`

**核心函数**:
- `getLongRunningAgentProgress()`: 优先检测，适用于简单项目
- `getDevEngineProgress()`: 企业级项目支持
- `getArchitectCollaborationProgress()`: 架构协作项目支持
- `getProgressData()`: 统一入口，按优先级返回数据

#### `src/render/progress-line.ts` (43 行)
进度行渲染模块，格式化输出：
```
🚀 [Feature 3/10] my-project → 实现用户登录  3/10
⚙️ [Developing] api-gateway → Add auth middleware  5/8
📐 [Task Breakdown] user-system → [ ] 编写单元测试  2/5
```

**图标设计**:
- 🚀 `long-running-agent`
- ⚙️ `dev-enegine`
- 📐 `architect-collaboration`

### 2. 修改文件

#### `src/types.ts`
- 新增 `ProgressData` 接口
- `RenderContext` 中用 `progress` 字段替代 `devEngine` 字段

#### `src/index.ts`
- 导入 `getProgressData` 替代 `getDevEngineData`
- 配置检查从 `showDevEngine` 改为 `showProgress`
- 上下文构造更新字段名

#### `src/config.ts`
- 配置项从 `showDevEngine: boolean` 改为 `showProgress: boolean`
- 默认值从 `false` 改为 `true`（默认启用）
- 迁移逻辑更新

#### `src/render/index.ts`
- 导入 `renderProgressLine` 替代 `renderDevEngineLine`
- 配置检查更新

#### `src/render/session-line.ts`
- 进度显示从 `ctx.devEngine` 改为 `ctx.progress`
- 字段映射更新

#### `src/transcript.ts`
- `TranscriptLine` 接口添加 `command` 字段
- `processEntry` 函数添加对 `entry.type === 'command'` 的处理
- 支持追踪 `/architect:phase-workflow` 等 Command

### 3. 删除文件

- `src/dev-engine.ts` (121 行) - 功能已整合到 `progress-tracker.ts`
- `src/render/dev-engine-line.ts` (36 行) - 功能已整合到 `progress-line.ts`

### 4. 测试更新

#### `tests/render.test.js`
- `baseContext()` 添加 `progress: null` 字段
- 配置添加 `showProgress: true`
- 修复模型名称断言（从 `[Opus]` 改为`[Opus`）

#### `tests/fixtures/expected/render-basic.txt`
- 更新期望输出为 `[Opus | API]`（反映当前模型显示逻辑）

### 5. 文档更新

#### `README.md` (主目录)
- 更新 Claude HUD 功能描述，新增进度追踪说明
- 更新插件组合推荐表
- 添加配置建议

#### `claude-hud/README.md`
- 新增 "Plugin Progress" 章节
- 更新配置选项表
- 添加使用示例

## 配置说明

### 默认行为
- 进度追踪 **默认启用** (`showProgress: true`)
- 自动检测项目使用的插件类型
- 按优先级显示：long-running-agent > dev-enegine > architect-collaboration

### 禁用进度追踪
```json
{
  "display": {
    "showProgress": false
  }
}
```
配置文件位置：`~/.claude/plugins/claude-hud/config.json`

### 通过 CLI 配置
```bash
/claude-hud:configure
```
在交互式配置中 toggle "Plugin Progress" 选项。

## 支持的进度格式

### long-running-agent
```
🚀 [Feature 3/10] todo-app → 实现任务删除  3/10
```
数据源：
- `feature_list.json`: 功能清单和完成状态
- `claude-progress.txt`: 进度日志

### dev-enegine
```
⚙️ [Developing] auth-system → Add JWT middleware  5/8
```
数据源：
- `.dev-enegine/requirements/manifest.json`: 需求状态
- `.dev-enegine/requirements/<req>/feature_list.json`: 功能清单

### architect-collaboration
```
📐 [Task Breakdown] user-mgmt → [ ] 编写单元测试  2/5
```
数据源：
- `docs/开发任务.md`: 任务列表（解析 `- [x]` 格式）
- `docs/requirements.md`, `docs/tech-design.md`: 项目名和阶段

## 技术亮点

### 1. 统一数据模型
所有插件的进度数据统一为 `ProgressData` 接口：
```typescript
interface ProgressData {
  source: 'long-running-agent' | 'dev-enegine' | 'architect-collaboration';
  projectName: string | null;
  phase: string | null;
  phaseLabel: string | null;
  completed: number;
  total: number;
  currentTask: string | null;
  lastLog: string | null;
}
```

### 2. 智能检测
- 按优先级检测不同插件的状态文件
- 不存在状态文件时返回 `null`，不影响 HUD 其他功能
- 错误静默处理，不会中断渲染

### 3. 命令追踪
新增对 Command 的追踪支持：
- `/architect:phase-workflow`
- `/dev-enegine:requirement-dev`
- 其他插件 Command

## 测试覆盖

- 单元测试：204 个测试，203 个通过，1 个跳过
- 无失败测试
- 新增进度追踪功能已有集成测试覆盖

## 向后兼容性

- 旧配置 `showDevEngine` 会自动迁移为 `showProgress`
- 状态文件格式无变更，不影响现有插件
- HUD 配置保持向后兼容

## 后续优化建议

1. **更多插件支持**: 可扩展支持其他插件的进度输出
2. **自定义图标**: 允许用户配置插件图标
3. **进度历史**: 记录并显示进度趋势图
4. **通知功能**: 功能完成时推送通知

## 改造日期

2026-04-11
