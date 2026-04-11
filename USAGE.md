# 插件使用指南

> 插件选择指南、功能对比、推荐使用顺序和完整参数说明

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 快速决策树

```
新项目？
├── 是 → 需求是否复杂/多需求？
│       ├── 是 → 是否需要架构评审？
│       │       ├── 是 → architect-collaboration → dev-enegine
│       │       └── 否 → dev-enegine
│       └── 否 → long-running-agent
└── 否（已有项目）
    ├── 是内容创作 → content-create
    └── 是代码开发
        ├── 多需求/团队协作 → dev-enegine
        └── 单需求/个人开发 → long-running-agent
```

---

## 📊 插件功能对比

### 核心功能矩阵

| 功能 | dev-enegine | long-running-agent | architect-collaboration | content-create | claude-hud |
|------|-------------|---------------------|------------------------|----------------|------------|
| **项目初始化** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **需求分析** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **技术方案设计** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **任务拆解** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **代码实现** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **代码审查** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **内容创作** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **状态监控** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **多需求管理** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Hooks 自动化** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **人工控制等级** | ✅ | ❌ | ✅ | ❌ | ❌ |

---

### 核心差异详解

#### dev-enegine vs long-running-agent

```
┌─────────────────────────────────────────────────────────────────┐
│ dev-enegine (企业级、复杂项目)                                   │
├─────────────────────────────────────────────────────────────────┤
│ • 多需求并行管理（manifest.json 索引）                           │
│ • 完整 Hooks 自动化（SubagentStop、Stop）                        │
│ • DAG 依赖分析 + 并行开发                                        │
│ • 三级人工控制（high/medium/low）                                │
│ • 完整文档体系（requirement.md + tech-design.md + DAG）         │
│ • 代码审查（Reviewer Agent）                                     │
│ • 适合：团队协作、核心业务、长期项目                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ long-running-agent (个人、简单项目)                              │
├─────────────────────────────────────────────────────────────────┤
│ • 单需求线性开发                                                 │
│ • 自动判断项目状态（Initializer/Coding）                         │
│ • 简单 feature_list.json                                        │
│ • 验证驱动开发                                                   │
│ • 适合：原型开发、一次性 Demo、个人小项目                        │
└─────────────────────────────────────────────────────────────────┘
```

**本质关系**：dev-enegine = long-running-agent + 企业级增强

---

## 🎯 推荐使用顺序（按场景）

### 场景 1：全新复杂项目（企业级/多需求）⭐

```
1️⃣ dev-enegine      → /project-init MyApp
                       # 初始化项目结构、Makefile、配置

2️⃣ dev-enegine      → /requirement-dev "用户管理系统"
                       # Planner 分析需求、写方案、拆解功能

3️⃣ dev-enegine      → 自动进入 Coder + Reviewer 循环
                       # 按 DAG 拓扑排序开发，自动审查，自动提交

4️⃣ claude-hud       → 实时监控进度（可选）
```

**为什么先用 dev-enegine**：
- 完整的 Hooks 系统自动化处理副作用
- 多需求管理能力
- 三级人工控制更灵活
- 代码审查保证质量

---

### 场景 2：快速原型/Demo（一次性需求）

```
1️⃣ long-running-agent → /requirement-develop "任务管理 App"
                         # 自动初始化 + 开发循环
   
2️⃣ claude-hud         → 实时监控（可选）
```

**为什么选 long-running-agent**：
- 单一入口，无需选择 Agent
- 自动判断项目状态
- 验证驱动，测试通过才提交
- 轻量级，无额外配置

---

### 场景 3：需要架构设计/技术方案评审 ⭐⭐

```
1️⃣ architect-collaboration → "分析需求并设计方案"
                              # 需求分析 → 技术设计 → 任务拆解 → 代码审查

2️⃣ dev-enegine             → /requirement-dev "按设计方案开发"
                              # 基于技术方案实施代码

3️⃣ claude-hud              → 监控进度
```

**为什么先用 architect-collaboration**：
- 四阶段结构化流程
- 技术方案评审更严谨
- 代码审查能力专业（5 维度评审）
- 适合核心业务架构设计

---

### 场景 4：内容创作/自媒体运营

```
1️⃣ content-create → /content-create:write "AI 热点分析"
                      # 热点收集 → 创作 → 评审 → 发布

2️⃣ claude-hud     → 监控 Context 使用（长任务推荐）
```

---

### 场景 5：企业级 SaaS（完整流程）⭐⭐⭐

```
1️⃣ architect-collaboration
   └── 需求分析 → 技术设计 → 任务拆解
   └── 产出：需求文档、技术方案、任务列表

2️⃣ dev-enegine
   └── /project-init         # 初始化
   └── /requirement-dev      # Planner + Coder + Reviewer 循环
   └── Hooks 自动化处理副作用

3️⃣ claude-hud
   └── 实时监控开发进度
```

---

## 📖 插件详细参数说明

### 1. dev-enegine - 自动化开发引擎

#### 命令列表

| 命令 | 功能 | 参数 |
|------|------|------|
| `/project-init` | 项目初始化 | `<项目名称>` `[--no-template]` |
| `/requirement-dev` | 需求开发 | `<需求描述>` `[--level high/medium/low]` |
| `/review-code` | 代码审查 | `[--feature F001]` `[--last]` `[--files ...]` `[--focus security]` |
| `/config` | 配置管理 | `[key=value]` |

#### /project-init

```bash
# 基础用法
/project-init MyApp

# 不使用模板
/project-init MyApp --no-template
```

**参数说明**：
- `<项目名称>` (必填) - 项目名字
- `--no-template` (可选) - 不使用模板，从零搭建

**产出物**：
- 项目骨架（frontend/ 和/或 backend/）
- Makefile（包含 start/stop/logs）
- `.dev-enegine/` 配置目录
- Git 初始提交

---

#### /requirement-dev

```bash
# 基础用法
/requirement-dev "实现用户登录功能"

# 指定控制等级
/requirement-dev "用户管理系统" --level high
/requirement-dev "用户管理系统" --level medium
/requirement-dev "用户管理系统" --level low
```

**参数说明**：
- `<需求描述>` (必填) - 需求简述
- `--level` (可选) - 人工控制等级，默认 low

**控制等级说明**：

| 等级 | Plan 后确认 | Feature 后确认 | 适用场景 |
|------|-----------|---------------|----------|
| **high** | ✅ 需确认 | ✅ 需确认 | 核心业务、首次使用 |
| **medium** | ✅ 需确认 | ⏭️ 自动继续 | 常规迭代 |
| **low** | ⏭️ 自动继续 | ⏭️ 自动继续 | 信任度高、小需求 |

**执行流程**：
1. Planner Agent 分析需求
2. 生成 requirement.md、tech-design.md、feature_list.json、dependency-graph.md
3. Coder Agent 按 DAG 顺序实现功能
4. Reviewer Agent 审查代码
5. Hooks 自动处理审查结果

---

#### /review-code

```bash
# 审查最近提交
/review-code --last

# 审查指定功能
/review-code --feature F001

# 审查指定文件
/review-code --files src/auth.ts,src/api/user.ts

# 重点审查安全性
/review-code --last --focus security
```

**参数说明**：
- `--feature` (可选) - 指定功能 ID
- `--commit` (可选) - 指定 commit hash
- `--last` (可选) - 审查最近一次提交
- `--files` (可选) - 指定文件路径（逗号分隔）
- `--focus` (可选) - 重点审查维度（security/performance/maintainability/style/testing）

**审查维度**：
- 🔒 安全性 (25%) - SQL 注入、XSS、认证授权等
- ⚡ 性能 (20%) - 时间复杂度、N+1 查询等
- 🔧 可维护性 (25%) - 单一职责、代码复用等
- 📐 规范性 (15%) - 命名、格式、注释等
- ✅ 测试 (15%) - 单元测试、边界测试等

**审查结果**：
- ✅ 通过 - 无阻塞/严重问题
- ⚠️ 条件通过 - 有主要/次要问题
- ❌ 不通过 - 有阻塞/严重问题

---

#### /config

```bash
# 查看当前配置
/config

# 修改配置
/config control_level=medium
/config parallel_features=true
/config auto_commit=false
```

**配置项说明**：

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `control_level` | `low` | 人工控制等级（high/medium/low） |
| `max_test_retry` | `5` | 单个 feature 最大重试次数 |
| `auto_commit` | `true` | Coder Agent 是否在实现后自动 commit |
| `parallel_features` | `false` | 是否并行开发无依赖的 features |
| `template_repo` | `git@github.com:xyzbit/ai-coding-layout.git` | 项目模板仓库 |

---

### 2. long-running-agent - 长时任务 Agent

#### 命令列表

| 命令 | 功能 | 参数 |
|------|------|------|
| `/requirement-develop` | 启动开发 | `<需求描述>` |

#### /requirement-develop

```bash
# 唯一入口命令
/requirement-develop "任务管理 App"
```

**参数说明**：
- `<需求描述>` (必填) - 需求简述（新项目时提供）

**执行流程**：
1. 检查 `feature_list.json` 判断项目状态
2. 新项目 → Initializer Agent 初始化
3. 已有项目 → Coding Agent 增量开发
4. 自动完成：实现 → 验证 → 提交 → 更新进度

**状态文件**：
| 文件 | 说明 |
|------|------|
| `feature_list.json` | 功能清单及完成状态 |
| `claude-progress.txt` | 进度日志 |
| `init.sh` | 启动脚本 |

---

### 3. architect-collaboration - 架构师协作

#### 命令列表

| 命令 | 功能 | 参数 |
|------|------|------|
| `/architect:phase-workflow` | 阶段工作流 | `[--phase 1/2/3/4]` `[--project "项目名"]` |
| `/architect:manage-progress` | 进度跟踪 | `[--export markdown]` `[--publish confluence]` |

#### /architect:phase-workflow

```bash
# 指定阶段
/architect:phase-workflow --phase 1 --project "E-commerce Platform"

# 交互式模式（推荐）
/architect:phase-workflow
```

**参数说明**：
- `--phase` (可选) - 指定阶段（1-4），不指定则提示选择
- `--project` (可选) - 项目名称

**四阶段说明**：

| 阶段 | 名称 | 产出物 |
|------|------|--------|
| 1 | 需求分析 | 需求文档 |
| 2 | 技术设计 | 架构方案、伪代码 |
| 3 | 任务拆解 | 开发任务.md |
| 4 | 功能开发 + 审查 | 代码 + 测试 + 审查报告 |

---

#### /architect:manage-progress

```bash
# 导出进度报告
/architect:manage-progress --export markdown

# 发布到 Confluence
/architect:manage-progress --publish confluence --url "https://wiki.company.com"
```

**参数说明**：
- `--export` (可选) - 导出格式（markdown/pdf）
- `--publish` (可选) - 发布平台（confluence/jira）
- `--url` (可选) - 发布目标 URL

---

### 4. content-create - 智能内容创作

#### 命令列表

| 命令 | 功能 | 参数 |
|------|------|------|
| `/content-create:write` | 内容创作 | `<topic>` `[platforms:wx,xhs]` `[skip-review:true]` |
| `/content-create:analysis` | 数据分析 | `<data-path>` `[analysis-type:trend]` |
| `/content-create:config` | 配置管理 | `[action:edit]` `[section:rss]` |

#### /content-create:write

```bash
# 基础用法
/content-create:write "AI 手机热点分析"

# 指定平台
/content-create:write "DeepSeek V3 评测" platforms:wx
/content-create:write "AI 编程工具对比" platforms:wx,xhs

# 跳过评审
/content-create:write "快速文章" skip-review:true
```

**参数说明**：
- `<topic>` (必填) - 创作主题或关键词
- `platforms` (可选) - 发布平台（wx/xhs/feishu），默认：wx,xhs
- `skip-review` (可选) - 跳过评审环节，默认：false
- `workspace` (可选) - 自定义工作空间路径

**工作流程**：
1. 初始化工作空间（生成时间戳目录）
2. 数据收集（collector agent）
3. 文章撰写（writer-wx/writer-xhs agent）
4. 质量评审（reviewer agent，可跳过）
5. 多平台发布

---

#### /content-create:analysis

```bash
# 分析 CSV 数据
/content-create:analysis article/2025-12-08/metrics.csv

# 趋势分析
/content-create:analysis data/wx_stats.json analysis-type:trend

# 性能分析
/content-create:analysis data/stats.csv analysis-type:performance
```

**参数说明**：
- `<data-path>` (必填) - 数据文件路径（支持 CSV/Excel/JSON）
- `analysis-type` (可选) - 分析类型（performance/trend/comparison）
- `output-path` (可选) - 报告输出路径

---

#### /content-create:config

```bash
# 查看配置
/content-create:config

# 编辑 RSS 配置
/content-create:config action:edit section:rss

# 重置配置
/content-create:config action:reset
```

---

### 5. claude-hud - 实时状态栏

#### 命令列表

| 命令 | 功能 | 参数 |
|------|------|------|
| `/claude-hud:setup` | 初始配置 | - |
| `/claude-hud:configure` | 自定义配置 | - |

#### /claude-hud:setup

```bash
# 初始配置状态栏
/claude-hud:setup
```

**作用**：将 HUD 配置写入 `~/.claude/settings.json`

---

#### /claude-hud:configure

```bash
# 打开配置向导
/claude-hud:configure
```

**配置项说明**：

| 配置 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `lineLayout` | string | `expanded` | 布局：expanded（多行）/ compact（单行） |
| `pathLevels` | 1-3 | 1 | 项目路径显示层级 |
| `gitStatus.enabled` | boolean | true | 显示 git 分支 |
| `gitStatus.showDirty` | boolean | true | 显示未提交标记 `*` |
| `display.showTools` | boolean | false | 显示工具活动 |
| `display.showAgents` | boolean | false | 显示 Agent 状态 |
| `display.showTodos` | boolean | false | 显示 Todo 进度 |
| `display.showUsage` | boolean | true | 显示使用配额 |

---

## 🔗 插件组合推荐

| 项目类型 | 推荐组合 | 说明 |
|----------|----------|------|
| **企业级 SaaS** | dev-enegine + architect-collaboration + claude-hud | 架构设计 → 多需求开发 → 实时监控 |
| **个人小工具** | long-running-agent + claude-hud | 快速开发 + 状态监控 |
| **自媒体内容** | content-create + claude-hud | 内容创作 + 长任务监控 |
| **技术探索/Demo** | long-running-agent | 单一需求完整实现 |
| **核心业务系统** | architect-collaboration → dev-enegine | 先架构设计，后迭代开发 |

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

## 📚 相关文档

- [dev-enegine 详细文档](dev-enegine/README.md)
- [long-running-agent 详细文档](long-running-agent/README.md)
- [architect-collaboration 详细文档](architect-collaboration/README.md)
- [content-create 详细文档](content-create/README.md)
- [claude-hud 详细文档](claude-hud/README.md)

---

**版本**: v1.0
**最后更新**: 2024-01-15
