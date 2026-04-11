# Architect Collaboration Plugin

A comprehensive Claude Code plugin that guides senior architects and development teams through a structured 4-phase collaboration workflow.

## Overview

This plugin implements the **Senior Architect Collaboration** methodology, providing interactive guidance, template generation, validation, and progress tracking throughout the software development lifecycle.

## Features

### Four-Phase Workflow

1. **Requirements Analysis** - Collaborative requirement gathering, breakdown, feasibility assessment
2. **Technical Design** - Solution architecture, TDD approach, documentation generation
3. **Task Breakdown** - Granular task creation with dependencies and priorities
4. **Feature Development** - Implementation guidance with quality checks and progress tracking

### Core Capabilities

- ✅ Interactive phase guidance with structured prompts
- ✅ Automatic template generation for each phase
- ✅ Validation and quality checks
- ✅ **Code review with security/performance/maintainability analysis**
- ✅ Progress tracking and dependency management
- ✅ Documentation system integration
- ✅ Risk identification and communication
- ✅ Pseudo-code generation for complex logic
- ✅ Test-driven development support

## Installation

```bash
# Install as a Claude Code plugin
cc --plugin-dir /path/to/architect-collaboration

# Or copy to plugins directory
cp -r architect-collaboration ~/.claude-plugins/
```

## Usage

### Natural Language Triggers (Recommended)

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

**完整触发词列表**: 查看 [QUICKSTART.md](QUICKSTART.md)

### Commands

Commands are optional - natural language triggers are recommended:

```bash
# Phase workflow management
/architect:phase-workflow --phase 1 --project "E-commerce Platform"

# Progress tracking
/architect:manage-progress --export markdown
```

## Plugin Components

### Skills (10 个)

See [Skills](#skills-10-个专家技能) section above for the full list.

### Commands (2 个)

1. **`/architect:phase-workflow`** - Phase 流程管理（启动、验证、生成模板）
2. **`/architect:manage-progress`** - 进度跟踪和文档发布

## Documentation Templates

The plugin generates standardized templates:

- **Requirements Document** - Business goals, constraints, success metrics
- **Technical Design Document** - Architecture, flowcharts, pseudo-code
- **Task List** - 开发任务.md with priorities and dependencies
- **Progress Reports** - Status tracking and completion metrics

## Configuration

### Settings (Optional)

Create `.claude/architect-collaboration.local.md` for custom settings:

```markdown
# Project Defaults
default_phase_duration: "2 weeks"
max_task_size: "2 person-days"

# Documentation
default_doc_format: "markdown"
export_formats: ["markdown", "pdf"]

# Quality Standards
test_coverage_threshold: 80
require_validation: true
```

## Workflow Principles

### Core Guidelines

1. **Confirmation Principle** - Quantify ambiguous descriptions and confirm key decisions
2. **Risk Communication** - Identify and communicate technical/business risks proactively
3. **Pseudo-code Requirement** - Generate pseudo-code for complex logic and algorithms
4. **Validation First** - Ensure each phase meets completion criteria before proceeding

### Phase Execution

Each phase follows:
- **Input** - Gather requirements and context
- **Process** - Apply structured methodology
- **Output** - Generate validated deliverables
- **Validate** - Check against quality criteria
- **Confirm** - User approval before proceeding

## Usage Examples

### Complete Workflow Example

```
# Phase 1: Requirements
"我需要开发一个多角色用户管理系统，请分析需求"

# Phase 2: Technical Design
"基于需求分析，设计系统架构和数据库表结构"
"定义 SLO 和监控指标"
"做威胁建模和安全设计"

# Phase 3: Task Breakdown
"根据技术设计，拆解开发任务"

# Phase 4: Development
"开始实现用户认证模块，使用 TDD 方式"

# Review
"审查已完成的代码安全性"
```

### Single Skill Invocation

```
"设计数据库表结构，画 ER 图" → db-design-skill
"定义 SLO 和灾备方案" → sre-review-skill
"设计监控方案和告警规则" → observability-skill
"GDPR 合规检查" → compliance-review-skill
"审查代码安全性" → security-review-skill + code-review-skill
```

## Best Practices

1. **Start with Requirements** - Always begin with Phase 1, even for small features
2. **Validate Continuously** - Use validation commands at each phase transition
3. **Document Everything** - Generate templates and keep them updated
4. **Track Progress** - Update task status regularly
5. **Communicate Risks** - Identify and escalate risks early

## Troubleshooting

### Skills 没有触发？

确保使用自然语言触发短语：
- "分析需求"、"设计方案"、"拆解任务"、"实现功能"
- 或者直接说技能名称："使用 db-design-skill 设计数据库"

### Commands 找不到？

验证插件已安装：
```bash
cc --list-plugins
```

### 模板没有生成？

确保项目目录有写权限，`.claude/` 目录存在。

### 如何查看完整触发词列表？

查看 [QUICKSTART.md](QUICKSTART.md) 获取完整的使用指南和触发词列表。

## Contributing

Contributions welcome! Please read our contributing guidelines and submit PRs for:
- New phase templates
- Additional validation rules
- Integration with other tools
- Documentation improvements

---

## 🔄 工作流程详解

### 四阶段流程

```
/architect:phase-workflow
        ↓
Phase 1: Requirements Analysis Skill → requirements.md
        ↓
Phase 2: Technical Design Skill → tech-design.md
        ↓
Phase 3: Task Breakdown Skill → 开发任务.md
        ↓
Phase 4: Feature Development Skill → 代码 + 测试
        ↓
        Code Review Skill → review-report.md
```

### 自动触发的 Skill

| 阶段 | 触发方式 | Skill | 产出物 |
|------|----------|-------|--------|
| Phase 1 | 命令/自然语言 | Requirements Analysis | requirements.md |
| Phase 2 | 命令/自然语言 | Technical Design | tech-design.md |
| Phase 3 | 命令/自然语言 | Task Breakdown | 开发任务.md |
| Phase 4 | 命令/自然语言 | Feature Development | 代码 + 测试 |
| Phase 4 完成后 | 自动/手动 | Code Review | review-report.md |

### 触发短语

**自然语言触发**：
- "分析需求" → Phase 1
- "设计方案" → Phase 2
- "拆解任务" → Phase 3
- "实现功能" → Phase 4
- "审查代码" → Code Review

详细工作流程请查看 [WORKFLOW.md](../WORKFLOW.md#3-architect-collaboration---架构师协作)

---

## 📚 相关文档

- [QUICKSTART.md](QUICKSTART.md) - 快速使用指南、完整触发词列表
- [TRIGGERS.md](TRIGGERS.md) - 自然语言触发快速参考
- [ENTERPRISE_CHECKLIST.md](ENTERPRISE_CHECKLIST.md) - 19 角色专家检查清单
- [使用指南](../USAGE.md) - 插件选择、功能对比、参数说明
- [工作流程](../WORKFLOW.md) - 详细工作流程、产出物规范

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/anthropics/claude-plugins/issues
- Documentation: https://docs.anthropic.com/claude-plugins

---

**Built with ❤️ by Claude Code Plugin Team**
