"GDPR 合规检查"                     → 合规专家介入
```

### Content-Create（自媒体内容创作）

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

**参数详解**：

| 命令 | 参数 | 说明 | 必填 |
|------|------|------|------|
| `/content-create:write` | `<主题>` | 文章主题/标题 | 是 |
| `/content-create:write` | `platforms:wx` | 指定发布平台 | 否 |
| `/content-create:analysis` | `<数据文件>` |  metrics.csv 路径 | 是 |
| `/content-create:config` | - | 配置管理 | - |

**支持平台**：
- `wx` - 微信公众号
- `xiaohongshu` - 小红书
- `feishu` - 飞书文档

---

### Claude HUD（实时状态监控）

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
| `display.showProgress` | `true` | 插件进度追踪（新增！） |
| `display.showTools` | `false` | 工具活动行 |
| `display.showAgents` | `false` | Agent 状态行 |
| `display.showTodos` | `false` | Todo 进度行 |
| `display.showDuration` | `false` | 会话时长 |
| `display.showConfigCounts` | `false` | 配置文件计数 |

**进度追踪显示示例**：
```
🚀 [Feature 3/10] my-project → 实现用户登录  3/10     # long-running-agent
⚙️ [Developing] api-gateway → Add auth middleware  5/8   # dev-enegine
📐 [Task Breakdown] user-system → [ ] 编写单元测试  2/5  # architect-collaboration
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

## 🔄 完整工作流程示例

### 示例 1：从零开始企业级项目

```bash
# 第 1 步：安装插件（一次性）
/plugins install dev-enegine
/plugins install architect-collaboration
/plugins install claude-hud

# 第 2 步：架构设计（Architect Collaboration）
/architect:phase-workflow --phase 1    # 需求分析 → docs/requirements.md
/architect:phase-workflow --phase 2    # 技术设计 → docs/tech-design.md
/architect:phase-workflow --phase 3    # 任务拆解 → docs/开发任务.md

# 第 3 步：初始化开发环境（DevEngine）
/project-init "MySaaS Platform"

# 第 4 步：需求开发（DevEngine）
/requirement-dev "用户管理系统"          # 自动读取架构文档
                                        # Planner → Coder → Reviewer 循环

# 第 5 步：实时监控（Claude HUD）
# 无需命令，HUD 自动显示进度：
# ⚙️ [Developing] MySaaS → 实现用户登录  3/10
```

### 示例 2：个人快速原型

```bash
# 第 1 步：安装插件
/plugins install long-running-agent
/plugins install claude-hud

# 第 2 步：开始开发（自动初始化 + 开发）
/requirement-develop "Todo App"         # 新项目 → Initializer Agent
                                        # 创建 feature_list.json
                                        # 实现第一个功能

# 第 3 步：继续开发
/requirement-develop "添加任务分类功能"   # Coding Agent 读取进度
                                        # 实现下一个功能

# 第 4 步：实时监控（Claude HUD）
# 🚀 [Feature 2/5] todo-app → 添加分类  2/5
```

### 示例 3：架构评审 + 自主开发

```bash
# 第 1 步：架构评审
"请设计一个高并发的秒杀系统架构"
# → architect-collaboration 自动介入
# → 产出：requirements.md + tech-design.md + 开发任务.md

# 第 2 步：初始化开发
/project-init "Seckill System" --no-template

# 第 3 步：需求开发
/requirement-dev "秒杀核心流程" --level high
                                        # 高控制级别，每步确认
                                        # 适合核心业务
```

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
