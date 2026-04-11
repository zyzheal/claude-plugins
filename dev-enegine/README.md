# DevEngine Plugin

基于 Anthropic 论文《Effective Harnesses for Long-Running Agents》设计的多 Agent 协作系统，支持需求规划→编码→测试的全流程自动化增量开发。通过 Claude Code 原生 Hooks 实现自动化副作用处理。

## 插件结构

```
dev-enegine/
├── .claude-plugin/
│   └── plugin.json              # 插件元数据
├── agents/
│   ├── initializer.md           # 初始化代理（项目搭建）
│   ├── planner.md               # 规划代理（需求分析 + 技术方案）
│   ├── coder.md                 # 编码代理（实现 + 自检 + commit）
│   └── reviewer.md              # 审查代理（安全性/性能/规范性审查）
├── hooks/
│   ├── hooks.json               # 原生 Hooks 配置
│   ├── README.md                # Hooks 详细说明
│   └── scripts/
│       ├── on-coder-complete.sh # SubagentStop: Coder 完成自动处理
│       └── check-completion.sh   # Stop: 防止未完成就终止
├── commands/
│   ├── project-init.md          # 项目初始化命令
│   ├── requirement-dev.md       # 需求开发主流程命令
│   ├── config.md                # 配置管理命令
│   └── review-code.md           # 代码审查命令
└── README.md
```

## 使用方法

### 1. 初始化项目（仅首次）

```
/project-init <项目名称>
/project-init <项目名称> --no-template
```

### 2. 需求开发（核心流程）

```
/requirement-dev <需求描述>
/requirement-dev <需求描述> --level high
/requirement-dev <需求描述> --level medium
```

### 3. 配置管理

```
/config                          # 查看当前配置
/config control_level=high       # 修改人工控制等级
/config parallel_features=true   # 开启并行开发
```

### 4. HUD 可视化（可选）
可以在 Claude 底部栏，看到项目进度、需求状态、功能进度等实时信息

```
/plugins install claude-hud    # 安装/更新 HUD
```

## 人工控制等级

| 等级 | Plan 后确认 | 每个 Feature 后确认 | 适用场景 |
|------|-----------|-------------------|---------|
| **high** | 需确认 | 需确认 | 核心业务、首次使用 |
| **medium** | 需确认 | 自动继续 | 常规迭代 |
| **low** | 自动继续 | 自动继续 | 信任度高、小需求 |

## 状态文件数据流

### 核心状态文件

| 文件路径 | 说明 |
|---------|------|
| `.dev-enegine/.lra-config.json` | 项目级 配置文件 |
| `.dev-enegine/claude-progress.txt` | 项目级 进度日志 |
| `.dev-enegine/requirements/manifest.json` | 项目级 需求索引（所有需求状态汇总） |
| `.dev-enegine/requirements/<需求>/requirement.md` | 需求文档 |
| `.dev-enegine/requirements/<需求>/tech-design.md` | 需求级 技术方案 |
| `.dev-enegine/requirements/<需求>/feature_list.json` | 需求级 功能清单（含通过状态） |
| `.dev-enegine/requirements/<需求>/dependency-graph.md` | 需求级 依赖关系图 |
| `.dev-enegine/requirements/<需求>/progress.log` | 需求级 进度日志 |

### 数据流图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  阶段 1: project-init                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Initializer Agent                                                    │   │
│  │  ├─ 创建: .dev-enegine/.lra-config.json                              │   │
│  │  ├─ 创建: .dev-enegine/requirements/manifest.json                    │   │
│  │  └─ 创建: .dev-enegine/claude-progress.txt                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  阶段 2: requirement-dev (新需求)                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  主会话 Command                                                        │   │
│  │  ├─ 更新: manifest.json (添加需求，status=planning)                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Planner Agent                                                        │   │
│  │  ├─ 创建: requirements/<需求>/requirement.md                          │   │
│  │  ├─ 创建: requirements/<需求>/tech-design.md                         │   │
│  │  ├─ 创建: requirements/<需求>/feature_list.json                      │   │
│  │  └─ 创建: requirements/<需求>/dependency-graph.md                     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  阶段 3: 开发循环 (按 DAG 拓扑排序)                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  主会话 Command                                                        │   │
│  │  ├─ 更新: manifest.json (status=developing)                           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────┐    ┌──────────────────────┐                   │
│  │  Coder Agent         │    │  Hook: SubagentStop   │                   │
│  │  ├─ 读取: tech-design │    │  on-coder-complete    │                   │
│  │  ├─ 实现 + 自检      │───▶│                       │                   │
│  │  └─ 写入: 源代码 + git│    └──────────┬───────────┘                   │
│  └──────────────────────┘               │                               │
│                                          │ (根据 control_level)          │
│                                          ▼                               │
│                                 ┌─────────────────────┐                  │
│                                 │ 低/中: 自动更新     │                  │
│                                 │ 高: 返回主会话确认  │                  │
│                                 ├─ feature_list.json  │                  │
│                                 │   (passes=true)     │                  │
│                                 └─ progress.log       │                  │
│                                                        │                  │
│                                 [循环直到所有 features passes=true]       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  阶段 4: 完成                                                                │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  主会话 Command                                                        │   │
│  │  ├─ 更新: manifest.json (status=completed)                            │   │
│  │  └─ 追加: claude-progress.txt (Requirement completed)                 │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 各步骤修改的状态文件详情

| 步骤 | 操作 | 修改的文件 |
|------|------|-----------|
| **project-init** | 创建 | `.dev-enegine/.lra-config.json`<br>`.dev-enegine/requirements/manifest.json`<br>`.dev-enegine/claude-progress.txt` |
| **新需求创建** | 更新 | `.dev-enegine/requirements/manifest.json` |
| **Planner Agent** | 创建 | `.dev-enegine/requirements/<需求>/requirement.md`<br>`.dev-enegine/requirements/<需求>/tech-design.md`<br>`.dev-enegine/requirements/<需求>/feature_list.json`<br>`.dev-enegine/requirements/<需求>/dependency-graph.md` |
| **开发循环开始** | 更新 | `.dev-enegine/requirements/manifest.json` (status→developing) |
| **Coder 完成 (PASS)** | 更新 | `.dev-enegine/requirements/<需求>/feature_list.json` (passes=true)<br>`.dev-enegine/requirements/<需求>/progress.log` |
| **需求完成** | 更新 | `.dev-enegine/requirements/manifest.json` (status→completed) |
| **需求完成** | 追加 | `.dev-enegine/claude-progress.txt` |

## Hooks

### SubagentStop → on-coder-complete.sh

Coder 完成时自动解析输出结果：
- **PASS + low/medium**: 自动更新 `feature_list.json` 的 `passes=true`，写入 `progress.log`
- **PASS + high**: 输出上下文，由主会话让用户确认后再更新
- **FAIL**: 记录失败摘要到 `progress.log`，返回摘要供主会话触发重试

### Stop → check-completion.sh

主会话即将结束时，检查是否有未完成的 feature，防止意外终止。

## Agents

| Agent | 职责 |
|-------|------|
| **Initializer** | 项目初始化：拉取模板/从零搭建、创建配置和需求管理目录 |
| **Planner** | 需求规划：阅读代码、编写技术方案、拆解 feature 清单（含 DAG） |
| **Coder** | 功能实现：遵循技术方案实现代码、自检验证、commit（feat/fix）、返回 PASS/FAIL |
| **Reviewer** | 代码审查：安全性/性能/规范性/可维护性/测试审查，生成审查报告 |

### Reviewer Agent 审查维度

| 维度 | 权重 | 检查内容 |
|------|------|----------|
| 安全性 | 25% | SQL 注入、XSS、认证授权、敏感数据、依赖安全 |
| 性能 | 20% | 时间复杂度、N+1 查询、内存管理、缓存使用 |
| 可维护性 | 25% | 单一职责、代码复用、依赖管理、可测试性 |
| 规范性 | 15% | 命名、格式、注释、错误处理 |
| 测试 | 15% | 单元测试、边界测试、集成测试 |

### 审查结果分级

| 等级 | 标识 | 说明 | 处理 |
|------|------|------|------|
| **阻塞** | 🔴 | 必须修复，否则不能合并 | 立即修复 |
| **严重** | 🟠 | 强烈建议修复 | 本迭代修复 |
| **主要** | 🟡 | 推荐修复 | 可放入技术债务 |
| **次要** | 🟢 | 可选优化 | 有空时修复 |

### 代码审查命令

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

审查报告保存到：`.dev-enegine/requirements/<需求>/review-report.md`

## 配置项

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `control_level` | `low` | 人工控制等级 |
| `max_test_retry` | `5` | 单个 feature 最大重试次数 |
| `auto_commit` | `true` | Coder Agent 是否在实现后自动 commit |
| `parallel_features` | `false` | 是否并行开发无依赖的 features |
| `template_repo` | github 地址 | 项目模板仓库 |

---

## 🔄 工作流程详解

### 完整流程图

```
/project-init → Initializer Agent → 项目结构 + 配置
                      ↓
/requirement-dev → Planner Agent → requirement.md + tech-design.md + feature_list.json
                      ↓
              Coder Agent (按 DAG 实现功能)
                      ↓
              Hook: on-coder-complete (自动处理)
                      ↓
              Reviewer Agent (代码审查)
                      ↓
              需求完成
```

### 自动触发的 Agent

| 触发时机 | 触发方式 | Agent | 说明 |
|----------|----------|-------|------|
| `/project-init` | 命令触发 | Initializer | 项目初始化 |
| `/requirement-dev` | 命令触发 | Planner | 需求规划 |
| Planner 完成后 | 自动 | Coder | 按 DAG 实现功能 |
| Coder 完成 | Hook (SubagentStop) | - | 自动处理审查/更新 |
| control_level=high | Hook 触发 | Reviewer | 代码审查 |
| `/review-code` | 命令触发 | Reviewer | 手动审查 |

详细工作流程请查看 [WORKFLOW.md](../WORKFLOW.md#1-dev-enegine---自动化开发引擎)

---

## 📚 相关文档

- [使用指南](../USAGE.md) - 插件选择、功能对比、参数说明
- [工作流程](../WORKFLOW.md) - 详细工作流程、产出物规范
- [Hooks 说明](hooks/README.md) - Hooks 配置和脚本说明