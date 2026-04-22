# Superpowers（超能力）

完整的软件开发工作流系统，为编程 Agent 提供一系列可组合的"技能"，包括头脑风暴、TDD、调试、架构设计、子 Agent 驱动开发等。

## 工作流程

### 核心流程

1. **brainstorming（头脑风暴）** - 在编写代码前激活，通过提问精炼设计，分段展示以获得确认，保存设计文档

2. **using-git-worktrees（Git 工作树）** - 设计批准后激活，创建隔离工作空间，运行项目设置，验证干净的测试基线

3. **writing-plans（编写计划）** - 将工作拆分为小任务（每个 2-5 分钟），每个任务包含具体的文件路径、完整代码、验证步骤

4. **subagent-driven-development（子 Agent 驱动开发）** - 分派子 Agent 处理每个工程任务，进行规范合规性和代码质量两阶段审查

5. **test-driven-development（测试驱动开发）** - 强制执行 RED-GREEN-REFACTOR 循环：写失败测试 → 观察失败 → 写最少代码 → 观察通过 → 提交

6. **requesting-code-review（请求代码审查）** - 任务间审查，根据计划检查，按严重程度报告问题，关键问题阻止进展

7. **finishing-a-development-branch（完成开发分支）** - 验证测试，提供选项（合并/PR/保留/丢弃），清理工作树

**Agent 在执行任何任务前都会检查相关技能。** 这些是强制工作流，不是建议。

## 安装

### Claude Code 官方市场

```bash
/plugin install superpowers@claude-plugins-official
```

### Gemini CLI

```bash
gemini extensions install https://github.com/obra/superpowers
```

### 验证安装

启动新会话并请求应触发技能的内容（如"帮我规划这个功能"或"调试这个问题"），Agent 应自动调用相关技能。

## 技能库

### 测试
- **test-driven-development** - RED-GREEN-REFACTOR 循环

### 调试
- **systematic-debugging** - 4 阶段根因分析
- **verification-before-completion** - 确保真正修复

### 协作
- **brainstorming** - 苏格拉底式设计精炼
- **writing-plans** - 详细实施计划
- **executing-plans** - 带检查点的批量执行
- **dispatching-parallel-agents** - 并发的子 Agent 工作流
- **requesting-code-review** - 预审查清单
- **receiving-code-review** - 响应反馈
- **using-git-worktrees** - 并行开发分支
- **finishing-a-development-branch** - 合并/PR 决策
- **subagent-driven-development** - 两阶段审查的快速迭代

### 元技能
- **writing-skills** - 创建新技能
- **using-superpowers** - 技能系统介绍

## 设计哲学

- **测试驱动开发** - 先写测试，始终如此
- **系统化而非即兴** - 流程胜过猜测
- **降低复杂度** - 简洁作为首要目标
- **证据胜过断言** - 验证后才宣布成功

## 更新

技能会随插件更新自动更新：

```bash
/plugin update superpowers
```

## 相关资源

- [Superpowers 博客](https://blog.fsck.com/2025/10/09/superpowers/)
- [Discord 社区](https://discord.gg/35wsABTejz)
- [GitHub 仓库](https://github.com/obra/superpowers)

## License

MIT License
