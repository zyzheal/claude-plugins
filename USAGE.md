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

## 🔧 插件安装与使用

### 安装插件

```bash
# 从 GitHub 安装
/plugins install https://github.com/zyzheal/claude-plugins

# 安装后重新加载插件
/reload-plugins
```

### 查看已安装插件

```bash
# 查看已安装的插件
/plugins list
```

### 启用插件

安装完成后，在 `~/.claude/settings.json` 中配置：

```json
{
  "extraKnownMarketplaces": {
    "zyzheal": {
      "source": {
        "source": "github",
        "repo": "zyzheal/claude-plugins"
      }
    }
  },
  "enabledPlugins": {
    "architect-collaboration@zyzheal": true,
    "dev-enegine@zyzheal": true,
    "long-running-agent@zyzheal": true,
    "content-create@zyzheal": true,
    "claude-hud@zyzheal": true
  }
}
```

然后重新加载：
```bash
/reload-plugins
```

---

## 📖 插件详细参数说明

### 1. dev-enegine - 自动化开发引擎

**安装后首次使用**：

```bash
# 1. 初始化新项目
/project-init MyApp

# 2. 开始需求开发
/requirement-dev "实现用户管理系统，支持多角色权限控制"

# 3. 代码审查（可选）
/review-code --last
```

#### 命令列表

| 命令 | 功能 | 参数 |
|------|------|------|
| `/project-init` | 项目初始化 | `<项目名称>` `[--no-template]` |
| `/requirement-dev` | 需求开发 | `<需求描述>` `[--level high/medium/low]` |
| `/review-code` | 代码审查 | `[--feature F001]` `[--last]` `[--files ...]` `[--focus security]` |
| `/config` | 配置管理 | `[key=value]` |

---

#### /project-init

**作用**：初始化新项目，创建项目骨架、Makefile、配置文件

```bash
# 基础用法
/project-init MyApp

# 不使用模板（从零搭建）
/project-init MyApp --no-template
```

**参数说明**：
- `<项目名称>` (必填) - 项目名字
- `--no-template` (可选) - 不使用模板，从零搭建

**产出物**：
- 项目骨架（frontend/ 和/或 backend/）
- Makefile（包含 start/stop/logs 命令）
- `.dev-enegine/` 配置目录
- Git 初始提交

**输出示例**：
```
📦 项目初始化：MyApp

✅ 创建项目目录：MyApp/
✅ 创建 frontend/ 目录
✅ 创建 backend/ 目录
✅ 创建 Makefile
✅ 创建 .dev-enegine/manifest.json
✅ Git 初始提交：feat: project initialization

下一步：
1. cd MyApp
2. /requirement-dev "你的需求描述"
```

---

#### /requirement-dev

**作用**：启动需求开发流程，Planner 分析需求→Coder 实现→Reviewer 审查

```bash
# 基础用法
/requirement-dev "实现用户登录功能"

# 指定控制等级（高/中/低）
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
2. 生成 `docs/requirement.md`、`docs/tech-design.md`、`docs/feature_list.json`、`docs/dependency-graph.md`
3. Coder Agent 按 DAG 顺序实现功能
4. Reviewer Agent 审查代码
5. Hooks 自动处理审查结果

**输出示例**：
```
🚀 需求开发：实现用户登录功能
控制等级：low

Step 1: Planner Agent 分析需求...
✅ 生成需求文档：docs/requirement.md
✅ 生成技术方案：docs/tech-design.md
✅ 生成功能清单：docs/feature_list.json
✅ 生成依赖图：docs/dependency-graph.md

Step 2: Coder Agent 开始实现...
[F001] 用户认证模块 - 完成 ✅
[F002] 登录 API - 完成 ✅
[F003] JWT Token 生成 - 完成 ✅

Step 3: Reviewer Agent 审查代码...
✅ 代码审查通过

完成！提交 3 个功能，代码审查通过
```

---

#### /review-code

**作用**：独立代码审查命令，支持指定文件、功能、审查重点

```bash
# 审查最近提交
/review-code --last

# 审查指定功能
/review-code --feature F001

# 审查指定文件
/review-code --files src/auth.ts,src/api/user.ts

# 重点审查安全性
/review-code --last --focus security

# 审查全部维度
/review-code --files src/*.ts --focus all
```

**参数说明**：
- `--feature` (可选) - 指定功能 ID（如 F001）
- `--commit` (可选) - 指定 commit hash
- `--last` (可选) - 审查最近一次提交
- `--files` (可选) - 指定文件路径（逗号分隔）
- `--focus` (可选) - 重点审查维度

**审查维度**：
- 🔒 **安全性 (25%)** - SQL 注入、XSS、认证授权等
- ⚡ **性能 (20%)** - 时间复杂度、N+1 查询等
- 🔧 **可维护性 (25%)** - 单一职责、代码复用等
- 📐 **规范性 (15%)** - 命名、格式、注释等
- ✅ **测试 (15%)** - 单元测试、边界测试等

**审查结果等级**：
- ✅ **通过** - 无阻塞/严重问题
- ⚠️ **条件通过** - 有主要/次要问题
- ❌ **不通过** - 有阻塞/严重问题

**输出示例**：
```
🔍 代码审查报告
审查对象：最近提交 (abc123)
审查范围：src/auth.ts, src/api/user.ts

评分：
┌─────────────┬──────┬──────┬──────┐
│ 维度        │ 得分 │ 满分 │ 评级 │
├─────────────┼──────┼──────┼──────┤
│ 安全性      │ 23   │ 25   │ 🟢   │
│ 性能        │ 18   │ 20   │ 🟢   │
│ 可维护性    │ 20   │ 25   │ 🟡   │
│ 规范性      │ 14   │ 15   │ 🟢   │
│ 测试        │ 12   │ 15   │ 🟡   │
├─────────────┼──────┼──────┼──────┤
│ 总分        │ 87   │ 100  │ B    │
└─────────────┴──────┴──────┴──────┘

审查结果：⚠️ 条件通过

🟡 主要问题：
1. src/auth.ts:45 - 密码哈希 iterations 建议从 10 增加到 12
2. src/api/user.ts:78 - 缺少输入验证

✅ 亮点：
- JWT token 过期时间配置合理
- 错误处理完善
```

---

#### /config

**作用**：查看或修改 dev-enegine 配置

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
| `template_repo` | `git@...` | 项目模板仓库 |

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

**输出示例**：
```
🚀 长时任务启动：任务管理 App

Step 1: 检查项目状态...
✅ 检测到新项目，启动 Initializer Agent

Step 2: 项目初始化...
✅ 创建项目目录结构
✅ 生成 feature_list.json（5 个功能）
✅ 创建 init.sh 启动脚本
✅ Git 初始提交

Step 3: 开始实现功能...
[F001] 用户注册 - 完成 ✅
[F002] 任务创建 - 完成 ✅
[F003] 任务列表 - 进行中 🔄

Step 4: 验证测试...
✅ 所有测试通过

下一步：继续实现剩余功能，或查看 claude-progress.txt 查看详细进度
```

---

### 3. architect-collaboration - 架构师协作

**两种使用方式**：

1. **命令调用** - 使用 `/architect:phase-workflow` 和 `/architect:manage-progress` 管理流程
2. **自然语言触发** - 直接对话触发 10 位专家技能（无需命令）

#### 自然语言触发专家技能

无需记忆命令，直接对话即可调用专家评审能力：

| 专家技能 | 触发关键词（中英文皆可） | 评审重点 |
|----------|------------------------|----------|
| **需求分析师** | "需求分析"、"requirements"、"业务目标"、"用户故事" | 业务价值、成功指标、干系人、验收标准 |
| **架构师** | "技术设计"、"架构设计"、"technical design"、"系统架构" | 架构模式、技术选型、系统边界、伪代码 |
| **项目经理** | "任务拆解"、"任务分解"、"task breakdown"、"WBS" | 任务粒度、依赖关系、里程碑、风险评估 |
| **高级工程师** | "功能开发"、"代码实现"、"feature development"、"编码" | 设计模式、代码结构、最佳实践、可测试性 |
| **安全专家** | "安全评审"、"security review"、"OWASP"、"威胁建模" | SQL 注入、XSS、认证授权、STRIDE 分析 |
| **数据库专家** | "数据库设计"、"ER 建模"、"索引优化"、"数据库评审" | ER 图、索引策略、数据一致性、分库分表 |
| **SRE 专家** | "SRE 评审"、"SLO 定义"、"灾备设计"、"故障应急" | 可用性目标、故障域隔离、容量规划 |
| **可观测性专家** | "监控设计"、"日志规范"、"告警策略"、"observability" | 日志分级、指标体系、链路追踪、告警分级 |
| **合规专家** | "合规评审"、"GDPR 合规"、"隐私保护"、"PIPL" | 数据本地化、用户同意、隐私影响评估 |
| **代码审查员** | "代码审查"、"code review"、"CR"、"评审代码" | 5 维度评分（安全/性能/维护/规范/测试） |

**使用示例**：

```bash
# 需求分析阶段
"请帮我分析这个需求的业务目标和成功指标"  → 需求分析师自动介入

# 技术方案阶段
"这个架构的技术可行性如何？有什么风险？"  → 架构师自动介入
"系统应该用什么技术栈？为什么？"  → 架构师自动介入

# 任务拆解阶段
"把这个功能拆解成具体的开发任务"  → 项目经理自动介入
"任务之间的依赖关系是什么？"  → 项目经理自动介入

# 代码审查阶段
"请审查这个 PR 的安全性"  → 安全专家 + 代码审查员介入
"这段代码的性能有什么优化空间？"  → 代码审查员介入
"数据库表设计是否合理？"  → 数据库专家介入
"监控和告警策略是否完善？"  → 可观测性专家介入
```

**代码审查 5 维度**：

当触发代码审查时，审查员会从以下维度评分：

| 维度 | 权重 | 评审要点 |
|------|------|----------|
| 🔒 **安全性** | 25% | SQL 注入、XSS、CSRF、认证授权、敏感数据加密 |
| ⚡ **性能** | 20% | 时间复杂度、N+1 查询、缓存策略、数据库索引 |
| 🔧 **可维护性** | 25% | 单一职责、代码复用、依赖注入、设计模式 |
| 📐 **规范性** | 15% | 命名规范、代码格式、注释完整性、类型定义 |
| ✅ **测试** | 15% | 单元测试、集成测试、边界条件、Mock 使用 |

**审查结果等级**：
- ✅ **通过** - 无阻塞/严重问题
- ⚠️ **条件通过** - 有主要/次要问题，需后续修复
- ❌ **不通过** - 有阻塞/严重问题，必须修改

#### 命令列表

| 命令 | 功能 | 参数 |
|------|------|------|
| `/architect:phase-workflow` | 阶段工作流管理 | `[--phase 1/2/3/4]` `[--project "项目名"]` `[--generate]` `[--validate]` |
| `/architect:manage-progress` | 进度跟踪与发布 | `[--export markdown]` `[--publish confluence]` `[--status]` `[--report]` `[--update]` |

#### /architect:phase-workflow vs /architect:manage-progress

**核心区别**：

| 维度 | phase-workflow | manage-progress |
|------|----------------|-----------------|
| **定位** | 阶段入口/出口管理 | 持续进度跟踪 |
| **主要功能** | 生成阶段文档模板、验证阶段完成标准 | 查看进度、生成报告、发布到 Wiki |
| **使用时机** | 阶段开始/结束时 | 日常/每周定期使用 |
| **验证功能** | ✅ 阶段完成标准验证 | ❌ |
| **发布功能** | ❌ | ✅ 多平台发布 (Confluence/Notion/GitHub) |
| **任务更新** | ❌ | ✅ 交互式更新任务状态 |

**典型工作流**：
```bash
# 1. 启动 Phase 1 - 使用 phase-workflow
/architect:phase-workflow --phase 1 --generate

# 2. 每周更新进度 - 使用 manage-progress
/architect:manage-progress --update          # 更新任务状态
/architect:manage-progress --status          # 查看进度
/architect:manage-progress --report --publish slack  # 发布周报

# 3. 验证 Phase 1 完成 - 使用 phase-workflow
/architect:phase-workflow --phase 1 --validate

# 4. 进入 Phase 2 - 使用 phase-workflow
/architect:phase-workflow --phase 2 --generate
```

---

#### /architect:phase-workflow

```bash
# 指定阶段并生成模板
/architect:phase-workflow --phase 1 --project "E-commerce Platform" --generate

# 验证阶段完成
/architect:phase-workflow --phase 1 --validate

# 交互式模式（推荐）
/architect:phase-workflow
```

**参数说明**：
- `--phase` (可选) - 指定阶段（1-4），不指定则提示选择
- `--project` (可选) - 项目名称
- `--generate` (可选) - 生成阶段模板
- `--validate` (可选) - 验证阶段完成标准
- `--interactive` (可选) - 强制交互模式

**四阶段说明**：

| 阶段 | 名称 | 产出物 | 验证标准 |
|------|------|--------|----------|
| 1 | 需求分析 | requirements.md | 6 项标准（业务目标、成功指标、干系人等） |
| 2 | 技术设计 | tech-design.md、架构图、伪代码 | 6 项标准（技术可行性、架构模式、TDD 方案等） |
| 3 | 任务拆解 | 开发任务.md、依赖图 | 6 项标准（任务粒度≤2 天、依赖映射、验收标准等） |
| 4 | 功能开发 | 代码 + 测试 + 审查报告 | 6 项标准（开发流程、代码质量、测试覆盖率≥80% 等） |

**模板生成位置**：
- Phase 1: `docs/requirements.md`, `docs/risk-assessment.md`
- Phase 2: `docs/technical-design.md`, `docs/architecture-diagram.md`, `docs/pseudocode.md`
- Phase 3: `docs/ 开发任务.md`, `docs/task-dependencies.md`, `docs/sprint-plan.md`
- Phase 4: `docs/implementation-plan.md`, `docs/testing-guide.md`, `docs/progress-tracker.md`

---

#### /architect:manage-progress

```bash
# 查看进度状态
/architect:manage-progress --status

# 生成 Markdown 报告
/architect:manage-progress --report --export markdown

# 发布到 Confluence
/architect:manage-progress --publish confluence --url "https://wiki.company.com"

# 交互式更新任务状态
/architect:manage-progress --update
```

**参数说明**：
- `--status` (可选) - 显示当前进度状态
- `--report` (可选) - 生成进度报告
- `--export` (可选) - 导出格式（markdown/json/pdf/html/csv）
- `--publish` (可选) - 发布平台（confluence/gitbook/github/notion/slack）
- `--url` (可选) - 发布目标 URL
- `--update` (可选) - 交互式更新任务状态
- `--project` (可选) - 项目名称

**输出示例**：
```
📊 Project Progress: User Authentication System

Phase Status:
┌────────────────────────────────────────┬──────────┬────────────┐
│ Phase                                  │ Status   │ Progress   │
├────────────────────────────────────────┼──────────┼────────────┤
│ 1. Requirements Analysis               │ ✅ Done  │ 100% (6/6) │
│ 2. Technical Design                    │ ✅ Done  │ 100% (6/6) │
│ 3. Task Breakdown                      │ 🔄 Active│  60% (6/10)│
│ 4. Feature Development                 │ ⏳ Pending│   0% (0/12)│
└────────────────────────────────────────┴──────────┴────────────┘

Task Summary:
- Total Tasks: 28
- Completed: 12 (43%)
- In Progress: 6 (21%)
- Pending: 10 (36%)
```

**发布平台支持**：
- **Confluence**: 发布到企业 Wiki
- **GitBook**: 发布到技术文档平台
- **GitHub Wiki**: 发布到项目 Wiki
- **Notion**: 发布到团队空间
- **Slack**: 发送进度摘要到频道

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

**输出示例**：
```
✍️ 内容创作启动：AI 手机热点分析

Step 1: 初始化工作空间...
✅ 创建目录：article/2025-04-11-ai-phone/
✅ 生成配置文件

Step 2: 数据收集（Collector Agent）...
✅ 收集热点新闻 15 条
✅ 收集竞品文章 8 篇
✅ 数据整合完成

Step 3: 文章撰写（Writer Agent）...
✅ 生成文章大纲
✅ 撰写正文（8500 字）
✅ 配图建议 5 张

Step 4: 质量评审（Reviewer Agent）...
✅ 内容准确性：95/100
✅ 可读性：90/100
✅ SEO 优化：88/100
✅ 评审通过

Step 5: 多平台发布...
✅ 发布到微信公众号
✅ 发布到小红书
✅ 生成发布报告

完成！文章已发布，查看 article/2025-04-11-ai-phone/ 查看完整内容
```

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

**输出示例**：
```
📊 数据分析报告

数据源：article/2025-12-08/metrics.csv
分析类型：趋势分析

核心指标：
┌─────────────────┬──────────┬──────────┬──────────┐
│ 指标            │ 本周     │ 上周     │ 环比     │
├─────────────────┼──────────┼──────────┼──────────┤
│ 阅读量          │ 15,234   │ 12,456   │ +22.3%   │
│ 分享次数        │ 1,823    │ 1,456    │ +25.2%   │
│ 新增关注        │ 456      │ 321      │ +42.0%   │
│ 收藏次数        │ 2,145    │ 1,789    │ +19.9%   │
└─────────────────┴──────────┴──────────┴──────────┘

趋势分析：
✅ 阅读量连续 3 周增长，AI 话题热度持续
✅ 分享率 11.9%，高于行业平均（8%）
⚠️ 收藏转化率 14.1%，有提升空间

建议：
1. 继续深耕 AI 垂直领域
2. 增加实操类内容提升收藏
3. 保持当前发布频率（每周 2 篇）
```

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

**作用**：将 HUD 配置写入 `~/.claude/settings.json`，启用实时状态显示

**输出示例**：
```
📺 Claude HUD 配置向导

Step 1: 检查当前配置...
✅ 备份现有 settings.json

Step 2: 写入 HUD 配置...
✅ 添加 statusLine 配置
✅ 启用 Git 状态显示
✅ 启用 Context 使用量显示

Step 3: 验证配置...
✅ 配置验证通过

完成！重新加载配置：/reload-plugins
```

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

**HUD 显示示例**：
```
┌─────────────────────────────────────────────────────────────┐
│ 📁 claude-plugins │ 🌿 master* │ 🧩 architect-collaboration │
│ 💬 124,582 / 200,000 (62.3%) │ 🔧 Read(3), Edit(1), Bash(2) │
│ ✅ 8/10 Tasks                                             │
└─────────────────────────────────────────────────────────────┘
```

**状态说明**：
- `📁` 当前项目目录
- `🌿` Git 分支（`*` 表示有未提交变更）
- `🧩` 当前活跃的插件/Agent
- `💬` Token 使用量（已用/总量，百分比）
- `🔧` 当前会话使用的工具及次数
- `✅` Todo 完成进度

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
