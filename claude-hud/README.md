> 项目基于 https://github.com/jarrodwatts/claude-hud 扩展

# Claude HUD

Claude Code 实时状态栏插件 -- 显示上下文健康度、工具活动、Agent 状态和 Todo 进度。所有内容直接展示在终端输入下方，无需额外窗口。

[![License](https://img.shields.io/github/license/jarrodwatts/claude-hud?v=2)](LICENSE)
[![Stars](https://img.shields.io/github/stars/jarrodwatts/claude-hud)](https://github.com/jarrodwatts/claude-hud/stargazers)

![Claude HUD 运行效果](claude-hud-preview-5-2.png)

## 安装步骤

在 Claude Code 中依次执行以下命令：

**第一步：添加插件市场**

```
/plugin marketplace add jarrodwatts/claude-hud
```

**第二步：安装插件**

> **Linux 用户请注意**：Linux 系统中 `/tmp` 通常是独立的 tmpfs 文件系统，可能导致安装失败并报错 `EXDEV: cross-device link not permitted`。
>
> **解决方法**：安装前设置 TMPDIR 环境变量：
> ```bash
> mkdir -p ~/.cache/tmp && TMPDIR=~/.cache/tmp claude
> ```
> 然后在启动的会话中运行安装命令。这是 [Claude Code 平台限制](https://github.com/anthropics/claude-code/issues/14799)。

```
/plugin install claude-hud
```

**第三步：配置状态栏**

```
/claude-hud:setup
```

完成！HUD 将立即显示，无需重启。

---

## HUD 是什么？

Claude HUD 为你提供 Claude Code 会话的实时状态概览：

| 显示内容 | 作用 |
|----------|------|
| **项目路径** | 确认当前所在项目（可配置 1-3 级目录深度） |
| **上下文健康度** | 实时了解上下文窗口使用情况，防止溢出 |
| **工具活动** | 实时观察 Claude 读取、编辑、搜索文件的操作 |
| **Agent 跟踪** | 查看哪些子代理正在运行及其当前任务 |
| **Todo 进度** | 实时追踪任务完成进度 |

## 显示效果

### 默认模式（2 行）

```
[Opus | Max] │ my-project git:(main*)
上下文 █████░░░░░ 45% │ 用量 ██░░░░░░░░ 25% (1 小时 30 分 / 5 小时)
```

- **第一行** -- 模型名称、方案名称（或 `Bedrock`）、项目路径、Git 分支
- **第二行** -- 上下文进度条（绿 -> 黄 -> 红）和用量速率限制

### 可选行（通过 `/claude-hud:configure` 启用）

```
◐ 编辑: auth.ts | ✓ 读取 ×3 | ✓ 搜索 ×2        ← 工具活动
◐ explore [haiku]: 查找认证代码 (2 分 15 秒)     ← Agent 状态
▸ 修复认证问题 (2/5)                             ← Todo 进度
🚀 [功能 3/10] my-project → 实现用户登录  3/10   ← 插件进度（新功能！）
◉ CPU ████░░░░ 42.3% │ MEM ██░░░░░░░ 128.5MB   ← 资源监控
```

**插件进度** 自动检测并展示来自以下插件的进度：
- **long-running-agent**: `feature_list.json` + `claude-progress.txt`
- **dev-enegine**: `.dev-enegine/requirements/manifest.json`
- **architect-collaboration**: `docs/开发任务.md`

---

## 工作原理

Claude HUD 使用 Claude Code 原生的 **statusline API** -- 无需额外窗口，不需要 tmux，在任何终端中都能正常工作。

```
Claude Code → stdin JSON → claude-hud → stdout → 在终端中显示
           ↘ transcript JSONL（工具、Agent、Todos）
```

**核心特性：**
- 使用 Claude Code 原生 Token 数据（非估算值）
- 解析会话转录文件获取工具/Agent 活动
- 每约 300ms 刷新一次

---

## 配置方法

随时自定义 HUD 显示内容：

```
/claude-hud:configure
```

引导式配置流程，无需手动编辑配置文件：

- **首次设置**：选择预设（完整/基本/极简），然后微调各个元素
- **随时调整**：切换项目开关、调整 Git 显示样式、切换布局
- **保存前预览**：在确认变更前，准确预览 HUD 的显示效果

### 预设方案

| 预设 | 显示内容 |
|------|----------|
| **完整** | 所有功能启用 -- 工具、Agent、Todo、Git、用量、时长 |
| **基本** | 活动行 + Git 状态，最小化信息干扰 |
| **极简** | 核心信息 -- 仅模型名称和上下文进度条 |

选择预设后，你可以单独开启或关闭各个元素。

### 手动配置

你也可以直接编辑配置文件，位于 `~/.claude/plugins/claude-hud/config.json`。

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `lineLayout` | string | `expanded` | 布局：`expanded`（多行）或 `compact`（单行） |
| `pathLevels` | 1-3 | 1 | 项目路径显示的目录级数 |
| `gitStatus.enabled` | boolean | true | 在 HUD 中显示 Git 分支 |
| `gitStatus.showDirty` | boolean | true | 显示 `*` 表示未提交的更改 |
| `gitStatus.showAheadBehind` | boolean | false | 显示 `↑N ↓N` 表示与远程分支的差距 |
| `gitStatus.showFileStats` | boolean | false | 显示文件变更数量 `!M +A ✘D ?U` |
| `display.showModel` | boolean | true | 显示模型名称 `[Opus]` |
| `display.showContextBar` | boolean | true | 显示上下文进度条 `████░░░░░░` |
| `display.contextValue` | `percent` \| `tokens` \| `remaining` | `percent` | 上下文显示格式（`45%`、`45k/200k` 或 `55%` 剩余） |
| `display.showConfigCounts` | boolean | false | 显示 CLAUDE.md、规则、MCP、Hooks 数量 |
| `display.showDuration` | boolean | false | 显示会话时长 `⏱️ 5m` |
| `display.showSpeed` | boolean | false | 显示输出 Token 速度 `out: 42.1 tok/s` |
| `display.showUsage` | boolean | true | 显示用量限制（Pro/Max/Team 用户可用） |
| `display.usageBarEnabled` | boolean | true | 用量显示为进度条而非纯文本 |
| `display.sevenDayThreshold` | 0-100 | 80 | 7 日用量超过此阈值时显示（0 = 始终显示） |
| `display.showTokenBreakdown` | boolean | true | 高上下文时（85%+）显示 Token 详情 |
| `display.showTools` | boolean | false | 显示工具活动行 |
| `display.showAgents` | boolean | false | 显示 Agent 活动行 |
| `display.showTodos` | boolean | false | 显示 Todo 进度行 |
| `display.showProgress` | boolean | true | 显示插件进度行（新功能！） |
| `display.showResource` | boolean | false | 显示资源监控（CPU/内存） |

### 插件进度（新功能！）

`showProgress` 选项（默认启用）自动检测并展示支持的插件进度：

| 插件 | 状态文件 | 显示格式 |
|------|---------|----------|
| **long-running-agent** | `feature_list.json`, `claude-progress.txt` | 🚀 [功能 3/10] 项目 → 任务 |
| **dev-enegine** | `.dev-enegine/requirements/manifest.json` | ⚙️ [开发中] 项目 → 任务 |
| **architect-collaboration** | `docs/开发任务.md` | 📐 [任务分解] 项目 → 任务 |

**输出示例：**

```
🚀 [功能 3/10] my-project → 实现用户登录  3/10
⚙️ [开发中] api-gateway → 添加认证中间件  5/8
📐 [任务分解] user-system → [ ] 编写单元测试  2/5
```

如需禁用，在配置中将 `display.showProgress` 设为 `false`。

### 资源监控

`showResource` 选项（默认关闭）显示 Claude Code 进程的资源使用情况：

```
◉ CPU ████░░░░░░ 42.3% │ MEM ██░░░░░░░░ 462.1MB (2.9%) │ PID 77604
```

- **CPU** -- Claude Code 进程 CPU 使用率（单核归一化，100% = 一个满核）
- **MEM** -- 内存使用量（绝对 MB 值 + 占系统内存百分比）
- **PID** -- Claude Code 进程 ID

**跨平台实现：**

| 平台 | 方法 | 指标 | 速度 | 匹配工具 |
|------|------|------|------|----------|
| macOS | `top -l 1` MEM | physFootprint | ~700ms | 活动监视器 |
| macOS（备选） | `ps -o rss` | RSS | ~5ms | `ps` 标准 |
| Linux | `/proc/[pid]/statm` | RSS | <1ms | `ps` 标准 |
| Windows | `Get-Process` | WorkingSet64 | ~200ms | 任务管理器 |

在配置中将 `display.showResource` 设为 `true` 即可启用。

### 用量限制显示（Pro/Max/Team 用户）

用量显示**默认启用**，适用于 Claude Pro、Max 和 Team 订阅用户。在第二行与上下文进度条一起显示速率限制消耗情况。

7 日百分比在超过 `display.sevenDayThreshold`（默认 80%）时显示：

```
上下文 █████░░░░░ 45% │ 用量 ██░░░░░░░░ 25% (1 小时 30 分 / 5 小时) | ██████████ 85% (2 天 / 7 天)
```

如需禁用，将 `display.showUsage` 设为 `false`。

**要求：**
- Claude Pro、Max 或 Team 订阅（API 用户不可用）
- Claude Code 的 OAuth 凭证（登录时自动创建）

**故障排查：** 如果用量不显示：
- 确认使用 Pro/Max/Team 账号登录（非 API 密钥）
- 检查配置中 `display.showUsage` 未设为 `false`
- API 用户无量用显示（按 Token 计费，无速率限制）
- AWS Bedrock 模型显示 `Bedrock` 并隐藏用量限制（用量在 AWS 中管理）

### 配置示例

```json
{
  "lineLayout": "expanded",
  "pathLevels": 2,
  "gitStatus": {
    "enabled": true,
    "showDirty": true,
    "showAheadBehind": true,
    "showFileStats": true
  },
  "display": {
    "showTools": true,
    "showAgents": true,
    "showTodos": true,
    "showConfigCounts": true,
    "showDuration": true
  }
}
```

### 显示示例

**1 级目录（默认）：** `[Opus] │ my-project git:(main)`

**2 级目录：** `[Opus] │ apps/my-project git:(main)`

**3 级目录：** `[Opus] │ dev/apps/my-project git:(main)`

**包含未提交标记：** `[Opus] │ my-project git:(main*)`

**包含远程差距：** `[Opus] │ my-project git:(main ↑2 ↓1)`

**包含文件统计：** `[Opus] │ my-project git:(main* !3 +1 ?2)`
- `!` = 修改文件，`+` = 新增/已暂存，`✘` = 删除，`?` = 未跟踪
- 数量为 0 的项会自动隐藏，保持显示整洁

### 故障排查

**配置不生效？**
- 检查 JSON 语法错误：无效 JSON 会静默回退到默认值
- 确保值有效：`pathLevels` 必须是 1、2 或 3；`lineLayout` 必须是 `expanded` 或 `compact`
- 删除配置文件后运行 `/claude-hud:configure` 重新生成

**Git 状态不显示？**
- 确认当前在 Git 仓库中
- 检查配置中 `gitStatus.enabled` 不为 `false`

**工具/Agent/Todo 行不显示？**
- 这些功能默认隐藏 -- 在配置中启用 `showTools`、`showAgents`、`showTodos`
- 它们仅在有活动可展示时才会出现

---

## 系统要求

- Claude Code v1.0.80+
- Node.js 18+ 或 Bun

---

## 开发指南

```bash
git clone https://github.com/jarrodwatts/claude-hud
cd claude-hud
npm ci && npm run build
npm test
```

参见 [CONTRIBUTING.md](CONTRIBUTING.md) 了解开发规范。

---

## 许可证

MIT -- 详见 [LICENSE](LICENSE)

---

## Star 历史

[![Star 历史图表](https://api.star-history.com/svg?repos=jarrodwatts/claude-hud&type=Date)](https://star-history.com/#jarrodwatts/claude-hud&Date)
