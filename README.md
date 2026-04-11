# Claude Code Plugins 精选集

> 收集日常工作中最常用、好用的 Claude Code Plugins，覆盖多个领域：编码、测试、内容创作、分发、分析...

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugin-purple.svg)](https://code.claude.com)

## 📚 Plugins 列表

### 🚀 开发效率类

#### [DevEngine](dev-enegine/) - 自动化开发引擎
**基于 Anthropic 论文《Effective Harnesses for Long-Running Agents》设计的多 Agent 协作系统**

- 🔄 需求规划 → 编码 → 测试 → 审查全流程自动化
- 📋 智能需求拆解，生成技术方案和 Feature 清单
- ⚡ 支持 DAG 依赖分析和并行开发
- 🎛️ 三级人工控制（high/medium/low）灵活可控
- 🔗 原生 Hooks 实现自动副作用处理
- 🔒 代码审查：安全性/性能/规范性/可维护性审查

**适用场景**：
- 企业级 SaaS 开发、核心业务系统
- 多需求并行开发、长期项目迭代
- 需要严格代码审查和质量把控的团队

**[📖 查看详细文档](dev-enegine/README.md)**

---

#### [Claude HUD](claude-hud/) - 实时状态栏
**终端里的实时监控面板**

- 📊 Context 使用量实时可视化
- 🤖 Subagent 活动状态追踪
- 🔧 工具调用历史展示
- ✅ Todo 进度实时显示
- 📈 Usage 配额消耗监控
- 🚀 **新增**：插件进度统一追踪（支持 dev-enegine / long-running-agent / architect-collaboration）

**进度追踪功能**：
```
🚀 [Feature 3/10] my-project → 实现用户登录  3/10     # long-running-agent
⚙️ [Developing] api-gateway → Add auth middleware  5/8   # dev-enegine
📐 [Task Breakdown] user-system → [ ] 编写单元测试  2/5  # architect-collaboration
```

**适用场景**：
- 长时间运行的任务监控
- 多 Agent 协作开发
- Context 配额敏感的项目
- 需要实时了解插件执行进度

**[📖 查看详细文档](claude-hud/README.md)**

---

#### [Architect Collaboration](architect-collaboration/) - 架构师协作
**四阶段结构化协作工作流 + 10 位专家技能**

- 📝 需求分析 - 业务目标、成功指标、干系人识别
- 🏗️ 技术设计 - 架构模式、技术选型、伪代码生成
- 📋 任务拆解 - 任务粒度≤2 天、DAG 依赖分析
- 💻 功能开发 - TDD 实施、代码质量把控
- 🔒 10 位专家：安全/数据库/SRE/可观测性/合规/代码审查等

**适用场景**：
- 复杂系统设计、技术方案评审
- 团队协作开发、跨团队沟通
- 需要多领域专家评审的项目（安全、合规、SRE）

**[📖 查看详细文档](architect-collaboration/README.md)**

---

#### [Long-Running Agent](long-running-agent/) - 长时任务 Agent
**基于 Anthropic 论文设计的双轨 Agent 系统**

- 🎯 单一入口自动判断项目状态
- 🔄 初始化 Agent / 编码 Agent 自动切换
- ✅ 验证驱动：测试通过才标记完成
- 📝 自动 commit 保持清晰历史

**适用场景**：
- 个人项目、原型快速开发
- 单一需求完整实现
- Demo、MVP、一次性工具

**[📖 查看详细文档](long-running-agent/README.md)**

---

### 🎨 内容创作类

#### [Content Creator](content-create/) - AI 内容助手
**一站式内容创作与发布解决方案**

- 🔍 自动收集热点信息（RSS + 搜索）
- ✍️ 多平台内容创作（微信、小红书、飞书）
- 🎯 智能风格模仿，保持个人 IP 特色
- 📊 质量评审打分，多轮迭代优化
- 🚀 一键发布到多个平台

**适用场景**：
- 自媒体日常运营
- 企业内容营销
- 个人品牌打造

**[📖 查看详细文档](content-create/README.md)**

---

## 🚀 快速开始

### 📖 使用指南

**强烈建议先阅读**：
- [使用指南](USAGE.md) - 插件选择决策树、功能对比、参数说明、详细命令文档
- [工作流程](WORKFLOW.md) - 各插件详细工作流程、自动触发的 Skill/Agent、产出物规范
- [企业级评估](ENTERPRISE_ASSESSMENT.md) - 企业级 SaaS 能力覆盖分析

### 安装插件

**步骤 1: 添加插件市场**
```bash
/plugins marketplace add https://github.com/zyzheal/claude-plugins.git
```

**步骤 2: 按需安装插件**
```bash
/plugins install dev-enegine
/plugins install claude-hud
/plugins install long-running-agent
/plugins install content-create
/plugins install architect-collaboration
```

**步骤 3: 重新加载插件**
```bash
/reload-plugins
```

---

## 🎯 插件选择决策树

```
开始
 │
 ├─ 企业级 SaaS / 核心业务系统？
 │   ├─ 需要架构设计/技术方案评审？ → architect-collaboration
 │   └─ 需要多需求并行开发？ → dev-enegine
 │
 ├─ 个人项目 / 快速原型？
 │   └─ 单一需求完整实现？ → long-running-agent
 │
 ├─ 自媒体内容创作？
 │   └─ 微信公众号/小红书发布？ → content-create
 │
 └─ 需要实时监控状态？
     └─ Context 使用量/Agent 活动追踪？ → claude-hud（推荐与以上任意组合）
```

---

## 📊 插件对比表

| 特性 | DevEngine | Long-Running | Architect | Content-Create |
|------|-----------|--------------|-----------|----------------|
| **目标用户** | 企业团队 | 个人开发者 | 架构师/技术负责人 | 自媒体运营 |
| **需求管理** | 多需求并行 | 单需求 | 四阶段结构化 | 热点驱动 |
| **代码审查** | ✅ 5 维度审查 | ❌ | ✅ 10 位专家 | ❌ |
| **Hooks 自动化** | ✅ 原生 Hooks | ❌ | ❌ | ✅ MCP |
| **多平台发布** | ❌ | ❌ | ❌ | ✅ 微信/小红书/飞书 |
| **状态监控** | ✅ (需 claude-hud) | ✅ (需 claude-hud) | ✅ (需 claude-hud) | ✅ (需 claude-hud) |
| **适用项目规模** | 大型 | 小型 | 中大型 | 内容创作 |

---

## 🔧 常用命令速查

### DevEngine
```bash
/project-init "Task Management App"     # 初始化项目
/requirement-dev "用户认证系统"           # 需求开发全流程
/review-code --last                     # 审查最近提交
/config control_level=high              # 设置高控制级别
```

### Long-Running Agent
```bash
/requirement-develop "Todo App"         # 唯一入口，自动判断项目状态
```

### Architect Collaboration
```bash
/architect:phase-workflow --phase 1 --generate    # 启动需求分析
/architect:phase-workflow --phase 2 --validate    # 验证技术设计完成
/architect:manage-progress --status               # 查看进度状态
/architect:manage-progress --report --publish slack  # 发布进度报告
```

**自然语言触发专家技能**（无需命令）：
```
"分析这个需求的业务目标"              → 需求分析师介入
"设计系统架构和数据库"               → 架构师介入
"审查代码安全性"                    → 安全专家 + 代码审查员介入
"数据库表设计合理吗？"               → 数据库专家介入
"定义 SLO 和监控指标"               → SRE 专家介入
"GDPR 合规检查"                     → 合规专家介入
```

### Content-Create
```bash
/content-create:write "AI 手机热点分析"              # 创作内容
/content-create:write "DeepSeek V3评测" platforms:wx  # 指定平台
/content-create:analysis article/metrics.csv         # 数据分析
/content-create:config                               # 配置管理
```

### Claude HUD
```bash
/claude-hud:setup                                    # 初始配置
/claude-hud:configure                                # 自定义配置
```

---

## ⚠️ 注意事项

### 安装相关

1. **Linux 用户注意**：`/tmp` 可能是独立文件系统，安装可能失败
   ```bash
   mkdir -p ~/.cache/tmp && TMPDIR=~/.cache/tmp claude
   ```

2. **插件加载失败**：运行 `/reload-plugins` 重新加载

3. **配置文件位置**：
   - 全局配置：`~/.claude/settings.json`
   - 项目配置：`.claude/*.local.md`（不提交到 git）

### 使用相关

1. **DevEngine 控制等级选择**：
   - `high`：核心业务、首次使用，每个阶段都确认
   - `medium`：常规迭代，规划后确认，Feature 自动继续
   - `low`：信任度高的小需求，全自动

2. **Architect Collaboration 触发技巧**：
   - 使用自然语言直接描述需求，无需记忆命令
   - 触发词越明确，技能匹配越准确
   - 可以同时触发多个专家技能（如"审查代码安全性和性能"）

3. **Content-Create 最佳实践**：
   - 准备 2-3 篇风格参考文章，放在 `article/style_references/`
   - 首次使用不建议跳过评审环节
   - API 密钥使用环境变量，不要硬编码

4. **Claude HUD 配置建议**：
   - 默认配置适合大多数场景
   - 开启 `showTools`/`showAgents`/`showTodos` 需要额外消耗
   - Context 阈值建议保持默认（70% 警告，85% 红色）
   - **进度追踪功能**：默认启用，自动检测项目使用的插件并显示进度
   - 配置项：`display.showProgress`（默认 `true`，设为 `false` 禁用进度显示）

### 性能相关

1. **Context 使用量高时**：
   - 开启新会话而不是延续长会话
   - 使用 `/clear` 清理上下文
   - 使用 `claude-hud` 监控 Context 消耗

2. **长任务执行**：
   - 使用 `long-running-agent` 或 `dev-enegine` 的增量开发能力
   - 避免单次会话执行过长时间的任务
   - 定期保存进度到状态文件

### 安全相关

1. **敏感信息**：
   - 不要在配置文件硬编码 API 密钥
   - 使用环境变量管理敏感凭证
   - 将 `.claude/*.local.md` 添加到 `.gitignore`

2. **代码审查**：
   - 核心业务代码建议设置 `control_level=high`
   - 审查不通过的问题必须修复后再合并
   - 安全性问题（阻塞/严重级别）零容忍

---

## 🔗 插件组合推荐

| 项目类型 | 推荐组合 | 说明 |
|----------|----------|------|
| **企业级 SaaS** | architect-collaboration + dev-enegine + claude-hud | 架构设计 → 多需求开发 → 实时监控（进度自动显示） |
| **个人小工具** | long-running-agent + claude-hud | 快速开发 + 状态监控（进度自动显示） |
| **自媒体内容** | content-create + claude-hud | 内容创作 + 长任务监控 |
| **技术探索/Demo** | long-running-agent | 单一需求完整实现 |
| **核心业务系统** | architect-collaboration → dev-enegine | 先架构设计，后迭代开发 |
| **团队协作项目** | architect-collaboration + claude-hud | 多阶段协作 + 进度可视化 |

---

## ❓ 常见问题

### Q: dev-enegine 和 long-running-agent 怎么选？

**A**: 
- **dev-enegine** = 企业级、多需求、团队协作、Hooks 自动化
- **long-running-agent** = 个人、单需求、快速原型

简单判断：如果需要管理多个需求或团队协作，选 dev-enegine；如果是一次性 Demo 或个人小项目，选 long-running-agent。

---

### Q: architect-collaboration 和 dev-enegine 有什么区别？

**A**:
- **architect-collaboration** = 架构设计、技术方案评审、代码审查
- **dev-enegine** = 自动化开发实施

推荐组合：先用 architect-collaboration 做架构设计，再用 dev-enegine 实施开发。

---

### Q: 代码审查功能在哪里？

**A**: 两个插件提供代码审查：
- **dev-enegine** - `/review-code` 命令，自动化审查
- **architect-collaboration** - Code Review Skill，自然语言触发

---

### Q: 可以同时使用多个插件吗？

**A**: 可以！推荐组合：
- dev-enegine + claude-hud（开发 + 监控）
- architect-collaboration → dev-enegine（设计 → 开发）
- content-create + claude-hud（创作 + 监控）

---

## 🤝 贡献

欢迎贡献新的 Plugin 或改进现有 Plugin！

推荐安装：[Plugin Dev](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev) 插件，用于快速开发和调试 Plugin。

### 贡献指南

1. Fork 本仓库
2. 创建新的 Plugin 目录
3. 遵循 [Claude Code Plugin 规范](https://code.claude.com/docs/en/plugins)
4. 提交 Pull Request

### Plugin 开发规范

- 每个 Plugin 独立目录
- 必须包含 `.claude-plugin/plugin.json` 和 `README.md`
- Skills/Commands/Agents 采用 Markdown 格式
- 提供完整的使用示例
- 添加必要的配置说明

---

## 📝 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Claude Code](https://code.claude.com) - 强大的 AI 编程助手
- 所有贡献者和使用者

---

**⭐️ 如果觉得有用，请给个 Star！**
