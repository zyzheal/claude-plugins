# commit-commands（Git 提交命令）

简化 Git 工作流的命令集合，支持自动提交、推送和创建 Pull Request，减少上下文切换和手动命令执行。

## 功能特性

- ✅ 自动生成符合仓库风格的提交信息
- ✅ 一键提交 + 推送 + 创建 PR
- ✅ 自动清理已删除的远程分支对应的本地分支
- ✅ 避免提交包含密钥的文件
- ✅ Claude Code 自动归属提交信息

## 安装

```bash
/plugin install commit-commands@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/commit-commands ~/.claude/plugins/local/commit-commands
```

## 命令

### `/commit`

自动创建 Git 提交，基于已暂存和未暂存的变更生成合适的提交信息。

**工作流程：**

1. 分析当前 Git 状态
2. 审查已暂存和未暂存的变更
3. 检查最近提交信息以匹配仓库风格
4. 起草合适的提交信息
5. 暂存相关文件
6. 创建提交

**示例：**

```bash
# 修改代码后
/commit

# Claude 将：
# - 审查变更
# - 暂存文件
# - 创建合适提交信息的提交
# - 显示提交状态
```

### `/commit-push-pr`

完整工作流命令：提交、推送并创建 Pull Request，一步完成。

**工作流程：**

1. 创建新分支（如果在 main 分支上）
2. 暂存并提交变更
3. 推送分支到 origin
4. 使用 `gh pr create` 创建 PR
5. 提供 PR URL

**示例：**

```bash
/commit-push-pr

# Claude 将：
# - 创建功能分支（如需要）
# - 提交变更
# - 推送到远程
# - 打开包含摘要和测试计划的 PR
# - 提供 PR URL
```

**PR 描述包含：**
- 变更摘要（1-3 个要点）
- 测试计划检查清单
- Claude Code 归属

### `/clean_gone`

清理已从远程删除的本地分支。

**工作流程：**

1. 列出所有本地分支，识别 `[gone]` 状态
2. 查找并删除与 `[gone]` 分支关联的工作树
3. 删除所有标记为 `[gone]` 的分支
4. 反馈清理结果

**示例：**

```bash
# PR 合并后，远程分支已删除
/clean_gone

# Claude 将：
# - 找到所有 [gone] 分支
# - 删除关联的工作树
# - 清理过期的本地分支
# - 报告清理内容
```

## 最佳实践

### 使用 `/commit`
- 提交前审查暂存的变更
- 让 Claude 分析变更并匹配仓库提交风格
- 开发过程中用于常规提交

### 使用 `/commit-push-pr`
- 准备好创建 PR 时使用
- 确保所有变更已完成并经过测试
- Claude 会分析完整分支历史生成 PR 描述
- 审查 PR 描述并根据需要编辑

### 使用 `/clean_gone`
- 定期运行以保持分支列表整洁
- 合并多个 PR 后特别有用
- 安全运行 - 仅删除已从远程删除的分支

## 工作流示例

### 快速提交

```bash
# 编写代码
/commit
# 继续开发
```

### 功能分支

```bash
# 跨多次提交开发功能
/commit   # 第一次提交
# 更多变更
/commit   # 第二次提交
# 准备创建 PR
/commit-push-pr
```

### 维护

```bash
# 合并多个 PR 后
/clean_gone
# 工作空间已清理，准备下一个功能
```

## 前置要求

- 已安装并配置 Git
- `/commit-push-pr` 需要 GitHub CLI（`gh`）已安装并认证
- 仓库必须有远程地址

## 常见问题

### `/commit` 创建空提交

确保有未暂存或已暂存的变更：
```bash
git status
```

### `/commit-push-pr` 无法创建 PR

安装并认证 GitHub CLI：
```bash
brew install gh  # macOS
gh auth login
```

### `/clean_gone` 找不到分支

更新远程跟踪信息：
```bash
git fetch --prune
```

分支必须已从远程删除才会标记为 `[gone]`。

## License

MIT License
