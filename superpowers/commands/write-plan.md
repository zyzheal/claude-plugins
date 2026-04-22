---
description: "Deprecated - use the superpowers:writing-plans skill instead"
argument-hint: none
allowed-tools: Agent, Read, Glob, TodoWrite
trigger: write plan, plan, architecture, 写计划, 架构设计
---

## ⚠️ Deprecated Command

This command is deprecated and will be removed in the next major release.

### Migration

Use the **superpowers:writing-plans** skill instead:

```
Just say: "write a plan for..." or "create an implementation plan"
```

The skill auto-triggers when you mention "write plan", "architecture design", "写计划", or "架构设计".

### Original Behavior

This command previously wrote comprehensive implementation plans assuming the engineer has zero context for the codebase, including which files to touch, code, testing, and documentation needed.
