# code-review（代码审查）

自动化的 Pull Request 代码审查插件，使用多个专业 Agent 并行审计，基于置信度评分过滤误报，只发布高质量、可操作的反馈。

## 功能特性

- ✅ 多 Agent 并行独立审查
- ✅ 置信度评分（0-100），过滤 80 分以下的误报
- ✅ CLAUDE.md 规范合规检查
- ✅ 变更代码的 Bug 检测
- ✅ Git blame 历史上下文分析
- ✅ 自动跳过已关闭、草稿或已审查的 PR
- ✅ 直接链接到代码行（完整 SHA + 行范围）

## 安装

```bash
/plugin install code-review@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/code-review ~/.claude/plugins/local/code-review
```

## 使用说明

### `/code-review`

对当前 Pull Request 执行自动代码审查。

**工作流程：**

1. 检查是否需要审查（跳过已关闭、草稿、微小或已审查的 PR）
2. 收集仓库中的 CLAUDE.md 指导文件
3. 汇总 PR 变更
4. 启动 4 个并行 Agent 独立审查：
   - **Agent #1 & #2**：CLAUDE.md 合规性审计
   - **Agent #3**：扫描明显 Bug
   - **Agent #4**：Git blame 历史上下文分析
5. 每个问题独立评分（0-100）
6. 过滤 80 分以下的问题
7. 仅发布高置信度问题的审查评论

**示例：**

```bash
# 在 PR 分支上运行
/code-review

# Claude 将：
# - 启动 4 个并行审查 Agent
# - 为每个问题评分置信度
# - 发布 80 分以上的问题评论
# - 如无高置信度问题则跳过发布
```

## 置信度评分标准

| 分数 | 含义 |
|------|------|
| 0 | 不确信，误报 |
| 25 |  somewhat 确信，可能是真的 |
| 50 | 中等确信，真实但轻微 |
| 75 | 高度确信，真实且重要 |
| 100 | 绝对确定，肯定是真的 |

## 被过滤的误报类型

- PR 之前就存在的问题（非本次引入）
- 看起来像 Bug 但实际上不是
- 吹毛求疵的意见
- Linter 能捕获的问题
- 一般质量问题（除非 CLAUDE.md 明确规定）
- 带有 lint 忽略注释的问题

## 审查评论格式

```markdown
## Code review

Found 3 issues:

1. OAuth 回调缺少错误处理（CLAUDE.md 规定"始终处理 OAuth 错误"）
   https://github.com/owner/repo/blob/abc123.../src/auth.ts#L67-L72

2. 内存泄漏：OAuth 状态未清理（finally 块缺少清理）
   https://github.com/owner/repo/blob/abc123.../src/auth.ts#L88-L95

3. 命名风格不一致（规范要求"函数使用 camelCase"）
   https://github.com/owner/repo/blob/abc123.../src/utils.ts#L23-L28
```

## 何时使用

✅ **适合：**
- 所有有实质变更的 Pull Request
- 涉及关键代码路径的 PR
- 多贡献者的 PR
- 需要规范合规性的 PR

❌ **不适合：**
- 已关闭或草稿 PR（自动跳过）
- 微小的自动化 PR（自动跳过）
- 需要立即合并的紧急修复
- 已审查的 PR（自动跳过）

## 配置

### 调整置信度阈值

默认阈值为 80。编辑 `commands/code-review.md` 修改：

```markdown
Filter out any issues with a score less than 80.
```

将 `80` 改为你偏好的阈值（0-100）。

### 自定义审查焦点

编辑 `commands/code-review.md` 添加或修改 Agent 任务：
- 添加安全导向的 Agent
- 添加性能分析 Agent
- 添加可访问性检查 Agent
- 添加文档质量检查

## Agent 架构

- **2x CLAUDE.md 合规 Agent**：冗余确保规范检查准确
- **1x Bug 检测器**：专注于变更中的明显 Bug
- **1x 历史分析器**：从 git blame 获取上下文
- **Nx 置信度评分器**：每个问题独立评分

## 前置要求

- Git 仓库（含 GitHub 集成）
- GitHub CLI（`gh`）已安装并认证
- CLAUDE.md 文件（可选但推荐用于规范检查）

## License

MIT License
