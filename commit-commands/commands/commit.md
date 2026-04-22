---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit with an AI-generated message based on staged changes
argument-hint: [--amend] [--signoff]
trigger: commit, git commit, 提交代码
---

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--amend` | Amend the last commit instead of creating a new one | false |
| `--signoff` | Add a Signed-off-by trailer to the commit message | false |

## Usage

```
/commit          # Stage changes and create commit
/commit --amend  # Amend the previous commit
```

## Triggers

This command activates when the user says:
- "commit" / "git commit" / "提交代码"
- "save changes" / "stage and commit"
- "make a commit"

## Workflow

1. Analyzes staged changes (or stages all if nothing staged)
2. Generates a descriptive commit message following Conventional Commits format
3. Creates the commit in a single atomic operation

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the above changes, create a single git commit.

You have the capability to call multiple tools in a single response. Stage and create the commit using a single message. Do not use any other tools or do anything else. Do not send any other text or messages besides these tool calls.
