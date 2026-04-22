# Claude Code Plugins

A collection of plugins for [Claude Code](https://code.claude.com) - from workflow automation and architecture design to content creation and security auditing.

## Quick Start

```bash
# Install any plugin by name
/plugin install <plugin-name>
```

All 26 plugins in this repository can be installed via the Claude Code plugin marketplace or by manual symlink.

---

## Plugin Inventory

### Workflow & Development

| Plugin | Skills | Commands | Description |
|--------|:------:|:--------:|-------------|
| [architect-collaboration](./architect-collaboration/) | 10 | 2 | 4-phase development: Requirements → Design → Task Breakdown → Feature Dev |
| [dev-enegine](./dev-enegine/) | - | 4 | Multi-agent system: Plan → Code → Test with DAG-based feature development |
| [long-running-agent](./long-running-agent/) | 4 | 1 | Dual-track agent for incremental development from Anthropic's paper |
| [feature-dev](./feature-dev/) | - | 1 | Feature development with code explorer, architect, and reviewer agents |
| [cli-anything](./cli-anything/) | - | 5 | Build stateful CLI interfaces for any GUI application |

### Code Quality & Review

| Plugin | Skills | Commands | Description |
|--------|:------:|:--------:|-------------|
| [code-review](./code-review/) | - | 1 | Automated PR review with multi-agent confidence scoring |
| [pr-review-toolkit](./pr-review-toolkit/) | - | 1 | Comprehensive PR review: comments, tests, errors, types, quality |
| [code-simplifier](./code-simplifier/) | - | - | Simplify and refine code for clarity while preserving functionality |
| [superpowers](./superpowers/) | 14 | 3 | Core skills library: TDD, debugging, collaboration, best practices |

### Infrastructure & MCP

| Plugin | Skills | Commands | Description |
|--------|:------:|:--------:|-------------|
| [context7](./context7/) | - | - | MCP server for up-to-date documentation lookup from source repos |
| [playwright](./playwright/) | - | - | Browser automation MCP: screenshots, clicks, form filling, testing |
| [mcp-server-dev](./mcp-server-dev/) | 3 | - | Skills for designing and building MCP servers (HTTP, MCPB, local) |
| [lsp-plugins](./lsp-plugins/) | - | - | LSP integration for 11 languages: TypeScript, Python, Go, Java, etc. |

### Content & Documentation

| Plugin | Skills | Commands | Description |
|--------|:------:|:--------:|-------------|
| [content-create](./content-create/) | 1 | 3 | Content creation workflow: hot topics → writing → review → multi-platform publish |
| [session-report](./session-report/) | 1 | - | HTML session reports: tokens, cache, subagents, expensive prompts |
| [skill-creator](./skill-creator/) | 1 | - | Create, improve, and measure Claude Code skills with eval support |
| [darwin-skill](./darwin-skill/) | - | - | 8-dimension skill evaluator and hill-climbing optimizer |

### Security & Configuration

| Plugin | Skills | Commands | Description |
|--------|:------:|:--------:|-------------|
| [security-guidance](./security-guidance/) | - | - | Security warnings for dangerous patterns (injection, XSS, unsafe ops) |
| [hookify](./hookify/) | 1 | 4 | Create custom hooks to prevent unwanted behaviors from conversation analysis |
| [claude-md-management](./claude-md-management/) | 1 | 1 | Audit and improve CLAUDE.md project memory files |
| [claude-code-setup](./claude-code-setup/) | 1 | - | Analyze codebase and recommend tailored automations |

### UI & Git

| Plugin | Skills | Commands | Description |
|--------|:------:|:--------:|-------------|
| [claude-hud](./claude-hud/) | - | 2 | Real-time statusline HUD: context health, tool activity, agent tracking |
| [commit-commands](./commit-commands/) | - | 3 | Git workflow: commit, push, create PR, clean gone branches |
| [frontend-design](./frontend-design/) | 1 | - | Frontend design skill for UI/UX implementation |

### Math & Specialized

| Plugin | Skills | Commands | Description |
|--------|:------:|:--------:|-------------|
| [math-olympiad](./math-olympiad/) | 1 | - | Competition math (IMO, Putnam, USAMO) with adversarial verification |
| [rust-analyzer-lsp](./rust-analyzer-lsp/) | - | - | Rust language server: code intelligence, go-to-definition, diagnostics |

---

## Featured Plugins

### architect-collaboration（架构师协作）

**首次激活命令**：
```bash
"请帮我设计一个用户认证系统"     → 架构师介入
```

**完整使用流程**：
```bash
# Phase 1: 需求分析
/architect:phase-workflow --phase 1    # 产出 docs/requirements.md

# Phase 2: 技术设计
/architect:phase-workflow --phase 2    # 产出 docs/technical-design.md

# Phase 3: 任务拆解
/architect:phase-workflow --phase 3    # 产出 docs/开发任务.md

# Phase 4: 功能开发
/architect:phase-workflow --phase 4    # 开始实现

# 进度管理
/architect:manage-progress --status    # 查看整体进度
```

**专家技能**（自然语言触发）：
```
"这个方案的安全风险大吗？"         → 安全审查专家
"数据库表结构怎么设计？"           → 数据库设计专家
"这段代码需要重构吗？"             → 代码审查专家
"部署方案怎么写？"                 → SRE 专家
"是否需要满足 GDPR？"              → 合规专家
```

### dev-enegine（开发引擎）

**首次激活命令**：
```bash
/project-init "MySaaS Platform"     # 初始化项目
/requirement-dev "用户管理系统"      # 需求开发
```

**完整使用流程**：
```bash
# 1. 初始化项目（首次）
/project-init "MySaaS Platform"        # 拉取模板 + 创建配置

# 2. 需求开发
/requirement-dev "用户登录功能"         # Planner → Coder → Reviewer
/requirement-dev "支付模块" --level high  # 高控制级别

# 3. 代码审查
/review-code --feature F001            # 专业代码审查
/review-code --last --focus security   # 重点审查安全性

# 4. 配置管理
/config control_level=high             # 调整控制等级
```

**控制等级**：
- `high`：核心业务、首次使用，每个阶段都确认
- `medium`：常规迭代，规划后确认，Feature 自动继续
- `low`：信任度高的小需求，全自动

### long-running-agent（长运行 Agent）

**首次激活命令**：
```bash
/requirement-develop "Todo App"    # 新项目 → Initializer Agent → 自动开发
```

**完整使用流程**：
```bash
# 1. 新项目（自动初始化 + 开发）
/requirement-develop "Todo App"          # Initializer Agent 创建骨架

# 2. 继续开发（增量）
/requirement-develop "添加任务分类功能"   # Coding Agent 读取进度继续
```

### content-create（内容创作）

**首次激活命令**：
```bash
/content-create:config
```

**完整使用流程**：
```bash
# 1. 首次配置
/content-create:config                  # 配置 API 密钥、发布平台、风格参考

# 2. 内容创作
/content-create:write "AI 手机热点分析"  # 创作内容（多平台通用）
/content-create:write "DeepSeek V3 评测" platforms:wx
                                        # 指定平台（wx/xiaohongshu/feishu）

# 3. 数据分析
/content-create:analysis article/metrics.csv
                                        # 分析已发布文章数据，优化风格

# 4. 配置管理
/content-create:config                  # 查看/修改配置
```

**支持平台**：
- `wx` - 微信公众号
- `xiaohongshu` - 小红书
- `feishu` - 飞书文档

### claude-hud（实时状态监控）

**首次激活命令**：
```bash
/claude-hud:setup
```

**完整使用流程**：
```bash
# 1. 初始配置（首次使用）
/claude-hud:setup                         # 自动检测平台、应用配置

# 2. 自定义配置（可选）
/claude-hud:configure                     # 交互式配置界面

# 3. 默认显示（无需命令）
                                          # Line 1: [模型] 项目名 git 分支
                                          # Line 2: Context 用量 | Usage 配额
                                          # Line 3+: 工具/Agent/Todo/进度（可选）
```

**配置选项**：

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `display.showTools` | `false` | 工具活动行 |
| `display.showAgents` | `false` | Agent 状态行 |
| `display.showTodos` | `false` | Todo 进度行 |
| `display.showDuration` | `false` | 会话时长 |
| `display.showConfigCounts` | `false` | 配置文件计数 |

---

## Plugin Combinations

| Project Type | Combination | Description |
|-------------|-------------|-------------|
| **Enterprise SaaS** | architect-collaboration + dev-enegine + claude-hud | Architecture → multi-feature dev → real-time monitoring |
| **Personal Tool** | long-running-agent + claude-hud | Quick dev + status monitoring |
| **Content Creator** | content-create + claude-hud | Content creation + task monitoring |
| **Core Business** | architect-collaboration → dev-enegine | Design first, then implement |
| **Team Collaboration** | architect-collaboration + claude-hud | Multi-phase collaboration + progress visualization |

---

## Complete Workflow Example

### Enterprise Project

```bash
# Step 1: Architecture Design
/architect:phase-workflow --phase 1    # Requirements → docs/requirements.md
/architect:phase-workflow --phase 2    # Technical Design → docs/tech-design.md
/architect:phase-workflow --phase 3    # Task Breakdown → docs/开发任务.md

# Step 2: Initialize Dev Environment
/project-init "MySaaS Platform"

# Step 3: Feature Development
/requirement-dev "用户管理系统"          # Planner → Coder → Reviewer cycle

# Step 4: Real-time Monitoring
# HUD automatically shows progress:
# ⚙️ [Developing] MySaaS → 实现用户登录  3/10
```

### Personal Prototype

```bash
# Step 1: Start Development
/requirement-develop "Todo App"         # Auto-init + first feature

# Step 2: Continue
/requirement-develop "Add task categories"  # Incremental development
```

---

## FAQ

**Q: dev-enegine vs long-running-agent?**
- **dev-enegine** = enterprise, multi-feature, team, Hooks automation
- **long-running-agent** = personal, single-feature, rapid prototype

**Q: architect-collaboration vs dev-enegine?**
- **architect-collaboration** = architecture design, tech planning, code review
- **dev-enegine** = automated development implementation
- Recommended: architect first, then dev-enegine

**Q: Can I use multiple plugins together?**
Yes! Recommended combos: dev-enegine + claude-hud, architect → dev-enegine, content-create + claude-hud.

---

## Contributing

Welcome to contribute new plugins or improve existing ones!

1. Fork this repository
2. Create a new plugin directory
3. Follow [Claude Code Plugin docs](https://code.claude.com/docs/en/plugins)
4. Submit a Pull Request

### Requirements

- Each plugin in its own directory
- Must include `.claude-plugin/plugin.json` and `README.md`
- Skills/Commands/Agents in Markdown format
- Provide complete usage examples
- Add necessary configuration documentation

---

## License

MIT License, see [LICENSE](LICENSE) file.

## Acknowledgments

- [Claude Code](https://code.claude.com) - AI programming assistant
- All contributors and users
