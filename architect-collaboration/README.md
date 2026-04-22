# architect-collaboration（架构师协作）

面向高级架构师和开发团队的 4 阶段协作工作流插件，通过结构化的需求分析、技术设计、任务拆解和功能开发流程，确保软件项目高质量交付。

## 功能特性

### 四阶段工作流

1. **需求分析** - 协作式需求收集、拆解、可行性评估
2. **技术设计** - 解决方案架构、TDD 方法、文档生成
3. **任务拆解** - 细粒度任务创建，包含依赖关系和优先级
4. **功能开发** - 实现指导，质量检查和进度跟踪

### 核心能力

- ✅ 结构化阶段引导与交互式提示
- ✅ 每个阶段自动生成模板
- ✅ 验证和质量检查
- ✅ **代码审查（安全性/性能/可维护性分析）**
- ✅ 进度跟踪和依赖管理
- ✅ 文档系统集成
- ✅ 风险识别和沟通
- ✅ 复杂逻辑伪代码生成
- ✅ 测试驱动开发支持

## 安装

```bash
/plugin install architect-collaboration@claude-plugins-official
```

### 手动安装

```bash
# 克隆仓库并链接
ln -s /path/to/architect-collaboration ~/.claude/plugins/local/architect-collaboration
```

## 使用说明

### 自然语言触发（推荐）

直接用自然语言描述需求，系统自动匹配技能：

```
"分析这个功能的需求" → Phase 1 需求分析
"设计系统架构和数据库" → Phase 2 技术设计
"拆解开发任务" → Phase 3 任务拆解
"实现用户登录功能" → Phase 4 功能开发
"审查代码安全性" → Code Review
"设计监控方案和告警" → Observability Skill
"定义 SLO 和灾备方案" → SRE Review Skill
"GDPR 合规检查" → Compliance Review Skill
```

### 命令（可选）

```bash
# 阶段流程管理
/architect:phase-workflow --phase 1 --project "电商平台"

# 进度跟踪
/architect:manage-progress --export markdown
```

### 完整工作流示例

```
# Phase 1: 需求分析
"我需要开发一个多角色用户管理系统，请分析需求"
# 产出: docs/requirements.md

# Phase 2: 技术设计
"基于需求分析，设计系统架构和数据库表结构"
# 产出: docs/tech-design.md

# Phase 3: 任务拆解
"根据技术设计，拆解开发任务"
# 产出: docs/开发任务.md

# Phase 4: 开发
"开始实现用户认证模块，使用 TDD 方式"
# 产出: 代码 + 测试

# 审查
"审查已完成的代码安全性"
# 产出: review-report.md
```

## 技能专家（10 个）

| 技能 | 触发方式 | 产出 |
|------|----------|------|
| 需求分析 | "分析需求" | requirements.md |
| 技术设计 | "设计方案" | tech-design.md |
| 任务拆解 | "拆解任务" | 开发任务.md |
| 功能开发 | "实现功能" | 代码 + 测试 |
| 代码审查 | "审查代码" | review-report.md |
| 数据库设计 | "设计数据库" | ER 图 + 表结构 |
| 安全审查 | "安全评估" | 安全报告 |
| SRE 评审 | "SLO 设计" | SLO 方案 |
| 合规检查 | "GDPR 检查" | 合规报告 |
| 可观测性 | "监控方案" | 监控规则 |

## 文档模板

插件会生成标准化文档：

- **需求文档** - 业务目标、约束条件、成功指标
- **技术设计文档** - 架构图、流程图、伪代码
- **任务列表** - 开发任务.md，包含优先级和依赖关系
- **进度报告** - 状态跟踪和完成度指标

## 配置

在项目根目录创建 `.claude/architect-collaboration.local.md` 自定义配置：

```markdown
# 项目默认值
default_phase_duration: "2 weeks"
max_task_size: "2 person-days"

# 文档
default_doc_format: "markdown"
export_formats: ["markdown", "pdf"]

# 质量标准
test_coverage_threshold: 80
require_validation: true
```

## 常见问题

### Skills 没有触发？

确保使用自然语言触发短语：
- "分析需求"、"设计方案"、"拆解任务"、"实现功能"
- 或者直接说技能名称："使用 db-design-skill 设计数据库"

### Commands 找不到？

验证插件已安装：
```bash
cc --list-plugins
```

## 工作流程图

```
/architect:phase-workflow
        ↓
Phase 1: 需求分析 → requirements.md
        ↓
Phase 2: 技术设计 → tech-design.md
        ↓
Phase 3: 任务拆解 → 开发任务.md
        ↓
Phase 4: 功能开发 → 代码 + 测试
        ↓
        代码审查 → review-report.md
```

## 相关文档

- [QUICKSTART.md](QUICKSTART.md) - 快速使用指南
- [TRIGGERS.md](TRIGGERS.md) - 自然语言触发快速参考
- [ENTERPRISE_CHECKLIST.md](ENTERPRISE_CHECKLIST.md) - 专家检查清单

## License

MIT License
