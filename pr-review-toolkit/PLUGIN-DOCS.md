# PR Review Toolkit Plugin

## 概述
全面的 PR 审查工具集，包含 6 个专业 agent 用于多维度代码审查。

## 安装
```
/plugin install pr-review-toolkit@claude-plugins-official
```

## 激活
通过命令触发，agent 自动调用。

## Agent 列表

| Agent | 职责 | 文件 |
|-------|------|------|
| Code Reviewer | 通用代码质量审查 | agents/code-reviewer.md |
| Code Simplifier | 代码简化和重构 | agents/code-simplifier.md |
| Comment Analyzer | PR 评论分析（重复检测、上下文判断） | agents/comment-analyzer.md |
| Silent Failure Hunter | 检测静默失败和边界遗漏 | agents/silent-failure-hunter.md |
| PR Test Analyzer | PR 测试覆盖度评估 | agents/pr-test-analyzer.md |
| Type Design Analyzer | 类型设计质量评估 | agents/type-design-analyzer.md |

## 使用方法
**触发方式：**
- 请求 PR 审查时自动启动
- 可指定特定 agent 进行专项分析

**流程：**
1. 获取 PR diff 和相关上下文
2. 并行启动多个分析 agent
3. 汇总各 agent 的审查结果
4. 过滤低置信度问题
5. 输出结构化审查报告

## 参数
| 参数 | 说明 |
|------|------|
| PR 编号 | 指定要审查的 PR |
| 审查深度 | 快速/标准/深度 三档 |

## 依赖
- `gh` CLI 工具
- Claude Code agent 系统
- 相关 CLAUDE.md 项目规范

## 示例
```
审查 PR #456
对这个 PR 进行深度审查
重点检查类型设计
分析测试覆盖率
```
