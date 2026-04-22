---
description: 对已完成的代码进行专业审查，生成结构化审查报告
argument-hint: [--feature <id>] [--commit <hash>] [--last] [--files <paths>] [--focus <dimension>]
allowed-tools: Bash, Read, Agent, TodoWrite
trigger: review code, code review, 代码审查, 审查代码, 检查代码质量
---

# 代码审查命令

对已完成的代码进行专业审查，生成结构化审查报告。

## 命令名称

```
/review-code
```

## 功能说明

调用 Reviewer Agent 对代码进行审查，覆盖：
- 🔒 安全性检查（SQL 注入、XSS、认证授权等）
- ⚡ 性能检查（时间复杂度、N+1 查询等）
- 📐 规范性检查（命名、格式、注释等）
- 🔧 可维护性检查（单一职责、代码复用等）
- ✅ 测试检查（单元测试、边界测试等）

## 参数说明

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `--feature` | 可选 | 指定功能 ID | `--feature F001` |
| `--commit` | 可选 | 指定 commit hash | `--commit abc1234` |
| `--last` | 可选 | 审查最近一次提交 | `--last` |
| `--files` | 可选 | 指定文件路径 | `--files src/auth.ts,src/api.ts` |
| `--focus` | 可选 | 重点审查维度 | `--focus security,performance` |

## 使用示例

### 审查指定功能
```
/review-code --feature F001
```

### 审查最近提交
```
/review-code --last
```

### 审查指定文件
```
/review-code --files src/auth.ts,src/api/user.ts
```

### 重点审查安全性
```
/review-code --last --focus security
```

### 自然语言触发
```
"审查刚才的代码提交"
"帮我 review 一下用户登录功能"
"检查安全性问题"
```

## 输出内容

审查报告保存到：
`.dev-enegine/requirements/<需求>/review-report.md`

包含：
1. 审查结论（总分、评级、通过/不通过）
2. 各维度得分详情
3. 分级问题列表（阻塞/严重/主要/次要）
4. 修复建议和示例代码
5. 行动项清单

## 审查结果处理

| 结果 | 说明 | 后续操作 |
|------|------|----------|
| ✅ 通过 | 无阻塞/严重问题 | 代码可合并 |
| ⚠️ 条件通过 | 有主要/次要问题 | 修复后可合并 |
| ❌ 不通过 | 有阻塞/严重问题 | 必须修复后重新审查 |

## 与控制等级集成

| 控制等级 | 审查触发 |
|----------|----------|
| **high** | Coder 完成后自动审查，用户确认 |
| **medium** | Coder 完成后自动审查，自动继续 |
| **low** | 按需手动触发审查 |

## 相关文件

- Reviewer Agent: `./agents/reviewer.md`
- 审查技能：`../architect-collaboration/skills/code-review-skill.md`
- 审查报告模板：`.dev-enegine/requirements/<需求>/review-report.md`
