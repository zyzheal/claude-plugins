# Feature Development Plugin

## 概述
完整的特性开发工作流，包含 3 个专业 agent：代码探索、架构设计、质量审查。

## 安装
```
/plugin install feature-dev@claude-plugins-official
```

## 激活
通过 `/feature-dev` 命令触发。

## Agent 列表
| Agent | 职责 | 文件 |
|-------|------|------|
| Code Explorer | 深入探索代码库，追踪执行路径 | agents/code-explorer.md |
| Code Architect | 设计特性架构，分析现有模式 | agents/code-architect.md |
| Code Reviewer | 审查实现质量 | agents/code-reviewer.md |

## 工作流程

### Phase 1: Discovery
理解用户需求，明确问题范围。

### Phase 2: Codebase Exploration
启动 Code Explorer 和 Code Architect 两个并行 agent：
- Code Explorer: 追踪代码执行路径，映射架构层
- Code Architect: 识别关键抽象、依赖关系、设计模式

### Phase 3: Design
基于 agent 返回的信息，设计实现方案，向用户确认。

### Phase 4: Implementation
按设计逐步实现特性，使用 TodoWrite 跟踪进度。

## 参数
| 参数 | 说明 |
|------|------|
| 特性描述 | 可选，简要说明要实现的功能 |

## 依赖
- Claude Code agent 系统
- TodoWrite 工具

## 示例
```
/feature-dev 添加用户收藏功能
帮我实现 API 限流
做一个文件上传的接口
```
