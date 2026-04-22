---
description: Cleans up all git branches marked as [gone] (branches deleted on remote but still exist locally), including removing associated worktrees
argument-hint: [--dry-run]
allowed-tools: Bash
trigger: clean branches, remove gone branches, cleanup stale branches, 清理分支
---

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `--dry-run` | Show what would be deleted without actually deleting | false |

## Usage

```
/clean_gone             # Delete all gone branches and their worktrees
/clean_gone --dry-run   # Preview what would be deleted
```

## Triggers

This command activates when the user says:
- "clean branches" / "remove gone branches" / "cleanup stale branches"
- "清理分支" / "删除已删除的远程分支"
- "prune local branches"

## What It Does

1. Lists branches with `[gone]` status (remote deleted)
2. For branches with worktrees: removes worktrees first
3. Deletes the local gone branches
4. Reports summary of cleaned branches

## Your Task

You need to execute the following bash commands to clean up stale local branches that have been deleted from the remote repository.

## Commands to Execute

1. **First, list branches to identify any with [gone] status**
   Execute this command:
   ```bash
   git branch -v
   ```
   
   Note: Branches with a '+' prefix have associated worktrees and must have their worktrees removed before deletion.

2. **Next, identify worktrees that need to be removed for [gone] branches**
   Execute this command:
   ```bash
   git worktree list
   ```

3. **Finally, remove worktrees and delete [gone] branches (handles both regular and worktree branches)**
   Execute this command:
   ```bash
   # Process all [gone] branches, removing '+' prefix if present
   git branch -v | grep '\[gone\]' | sed 's/^[+* ]//' | awk '{print $1}' | while read branch; do
     echo "Processing branch: $branch"
     # Find and remove worktree if it exists
     worktree=$(git worktree list | grep "\\[$branch\\]" | awk '{print $1}')
     if [ ! -z "$worktree" ] && [ "$worktree" != "$(git rev-parse --show-toplevel)" ]; then
       echo "  Removing worktree: $worktree"
       git worktree remove --force "$worktree"
     fi
     # Delete the branch
     echo "  Deleting branch: $branch"
     git branch -D "$branch"
   done
   ```

## Expected Behavior

After executing these commands, you will:

- See a list of all local branches with their status
- Identify and remove any worktrees associated with [gone] branches
- Delete all branches marked as [gone]
- Provide feedback on which worktrees and branches were removed

If no branches are marked as [gone], report that no cleanup was needed.

