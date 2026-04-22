# Commit Commands Plugin

## 概述
简化 git 工作流的命令集合，支持提交、推送和创建 PR。

## 安装
```
/plugin install commit-commands@claude-plugins-official
```

## 激活
通过命令触发，在 Claude Code 交互中自动生效。

## 命令

### commit.md — 创建提交
**触发：** 用户请求提交代码时
**流程：**
1. 自动获取 git status、diff、当前分支、最近提交
2. 基于变更内容生成合适的提交消息
3. 执行 `git add` 和 `git commit`

### commit-push-pr.md — 提交并推送
**触发：** 用户请求提交并推送 PR 时
**流程：**
1. 创建提交
2. 推送到远程分支
3. 创建 Pull Request

### clean_gone.md — 清理已删除的文件
**触发：** 删除文件后自动清理 git 跟踪
**流程：**
1. 检测已删除但仍被 git 跟踪的文件
2. 从 git 索引中移除

## 参数
| 参数 | 说明 |
|------|------|
| 提交消息 | 可手动指定，默认自动生成 |
| 分支名 | 当前分支，可切换 |

## 依赖
- git CLI
- gh CLI（用于 PR 操作）

## 示例
```
提交这些变更
帮我 commit 并创建 PR
清理已删除的文件
```
