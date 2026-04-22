---
name: requesting-code-review
description: >-
  Request code review before merging - dispatches subagent to verify work meets requirements.
  Trigger: request review, PR review, 请求审查, 代码审查.
  Use when: completing tasks, implementing major features, or before merging.
---

# Requesting Code Review

Dispatch superpowers:code-reviewer subagent to catch issues before they cascade. The reviewer gets precisely crafted context for evaluation — never your session's history. This keeps the reviewer focused on the work product, not your thought process, and preserves your own context for continued work.

**Core principle:** Review early, review often.

## When to Request Review

**Mandatory:**
- After each task in subagent-driven development
- After completing major feature
- Before merge to main

**Optional but valuable:**
- When stuck (fresh perspective)
- Before refactoring (baseline check)
- After fixing complex bug

## How to Request

**1. Get git SHAs:**
```bash
BASE_SHA=$(git rev-parse HEAD~1)  # or origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

**2. Dispatch code-reviewer subagent:**

Use Task tool with superpowers:code-reviewer type, fill template at `code-reviewer.md`

**Placeholders:**
- `{WHAT_WAS_IMPLEMENTED}` - What you just built
- `{PLAN_OR_REQUIREMENTS}` - What it should do
- `{BASE_SHA}` - Starting commit
- `{HEAD_SHA}` - Ending commit
- `{DESCRIPTION}` - Brief summary

**3. Act on feedback:**
- Fix Critical issues immediately
- Fix Important issues before proceeding
- Note Minor issues for later
- Push back if reviewer is wrong (with reasoning)

## Example

```
[Just completed Task 2: Add verification function]

You: Let me request code review before proceeding.

BASE_SHA=$(git log --oneline | grep "Task 1" | head -1 | awk '{print $1}')
HEAD_SHA=$(git rev-parse HEAD)

[Dispatch superpowers:code-reviewer subagent]
  WHAT_WAS_IMPLEMENTED: Verification and repair functions for conversation index
  PLAN_OR_REQUIREMENTS: Task 2 from docs/superpowers/plans/deployment-plan.md
  BASE_SHA: a7981ec
  HEAD_SHA: 3df7661
  DESCRIPTION: Added verifyIndex() and repairIndex() with 4 issue types

[Subagent returns]:
  Strengths: Clean architecture, real tests
  Issues:
    Important: Missing progress indicators
    Minor: Magic number (100) for reporting interval
  Assessment: Ready to proceed

You: [Fix progress indicators]
[Continue to Task 3]
```

## Integration with Workflows

**Subagent-Driven Development:**
- Review after EACH task
- Catch issues before they compound
- Fix before moving to next task

**Executing Plans:**
- Review after each batch (3 tasks)
- Get feedback, apply, continue

**Ad-Hoc Development:**
- Review before merge
- Review when stuck

## Red Flags

**Never:**
- Skip review because "it's simple"
- Ignore Critical issues
- Proceed with unfixed Important issues
- Argue with valid technical feedback

**If reviewer wrong:**
- Push back with technical reasoning
- Show code/tests that prove it works
- Request clarification

See template at: requesting-code-review/code-reviewer.md


## 工作流程

1. **理解需求** — 确认用户意图、输入数据和期望输出
2. **执行核心操作** — 按照 requesting-code-review 的具体能力执行任务
3. **验证结果** — 检查输出是否符合预期格式和质量要求
4. **反馈用户** — 展示结果，说明关键发现和后续建议

## 错误处理与边界条件

| 场景 | 触发条件 | 处理动作 |
|------|----------|----------|
| 输入不完整 | 缺少关键信息或上下文 | 明确列出所需信息，询问用户补充 |
| 目标文件不存在 | 路径错误或文件未创建 | 验证路径，提示用户确认或创建 |
| 操作失败 | 工具调用返回错误 | 分析错误原因，提供 1-2 个替代方案 |
| 输出异常 | 结果不符合预期格式 | 检查格式要求，重试或手动修正 |
| 冲突检测 | 与现有代码/配置冲突 | 列出冲突点，建议合并策略 |

**原则**：遇到异常先分析原因，给出明确的错误说明和可行的下一步，不静默失败。
