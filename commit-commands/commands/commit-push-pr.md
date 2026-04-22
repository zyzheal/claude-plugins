---
allowed-tools: Bash(git checkout --branch:*), Bash(git add:*), Bash(git status:*), Bash(git push:*), Bash(git commit:*), Bash(gh pr create:*)
description: Commit changes, push to a new branch, and create a GitHub PR in one step
argument-hint: [--title "PR Title"] [--body "PR description"]
trigger: commit push pr, create pr, commit and push, 提交并创建PR
---

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--title` | PR title | Auto-generated from commit message |
| `--body` | PR body/description | Auto-generated from changes |
| `--draft` | Create as draft PR | false |

## Usage

```
/commit-push-pr              # Auto-detect changes, commit, push, create PR
/commit-push-pr --title "feat: add auth"  # Custom PR title
```

## Triggers

This command activates when the user says:
- "commit and push" / "commit push pr" / "create pr"
- "提交并创建PR" / "推送并创建PR"
- "save and create PR"

## Workflow

1. Creates a new branch from current branch (if on main)
2. Stages all changes and creates a commit
3. Pushes the branch to origin
4. Creates a PR using `gh pr create`
5. Opens the PR URL in browser

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`

## Your task

Based on the above changes:

1. Create a new branch if on main
2. Create a single commit with an appropriate message
3. Push the branch to origin
4. Create a pull request using `gh pr create`
5. You have the capability to call multiple tools in a single response. You MUST do all of the above in a single message. Do not use any other tools or do anything else. Do not send any other text or messages besides these tool calls.
