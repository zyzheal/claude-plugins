# hookify（Hook 创建器）

通过简单的 Markdown 配置文件创建自定义 Hook，防止不需要的行为。无需编辑复杂的 `hooks.json` 文件，只需用自然语言描述规则即可。

## 功能特性

- ✅ 自动分析对话发现不需要的行为
- ✅ 简单的 Markdown 配置 + YAML frontmatter
- ✅ 正则表达式模式匹配
- ✅ 无需编码 - 只需描述行为
- ✅ 即时生效，无需重启
- ✅ 支持警告（warn）和阻止（block）两种动作

## 安装

```bash
/plugin install hookify@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/hookify ~/.claude/plugins/local/hookify
```

## 快速开始

### 1. 创建第一条规则

```bash
/hookify 警告我使用 rm -rf 命令
```

这会分析你的请求并创建 `.claude/hookify.warn-rm.local.md`。

### 2. 立即测试

**无需重启！** 规则在下一次工具使用时立即生效。

```
运行 rm -rf /tmp/test
```

你应该立即看到警告消息！

## 命令

### `/hookify <描述>`

根据明确指示创建规则。

```bash
/hookify 不要在 TypeScript 文件中使用 console.log
/hookify 阻止所有删除操作
/hookify 提醒我不要忘记运行测试
```

### `/hookify`（无参数）

分析最近的对话，找出你纠正过或感到沮丧的行为。

### `/hookify:list`

列出所有规则。

### `/hookify:configure`

通过交互界面启用/禁用现有规则。

### `/hookify:help`

获取帮助。

## 规则配置格式

### 简单规则（单模式）

`.claude/hookify.dangerous-rm.local.md`：

```markdown
---
name: block-dangerous-rm
enabled: true
event: bash
pattern: rm\s+-rf
action: block
---

⚠️ **检测到危险的 rm 命令！**

此命令可能删除重要文件。请：
- 验证路径是否正确
- 考虑使用更安全的方法
- 确保有备份
```

**动作字段：**
- `warn`：显示警告但允许操作（默认）
- `block`：阻止操作执行

### 高级规则（多条件）

`.claude/hookify.sensitive-files.local.md`：

```markdown
---
name: warn-sensitive-files
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.env$|credentials|secrets
  - field: new_text
    operator: contains
    pattern: KEY
---

🔐 **检测到编辑敏感文件！**

确保凭据没有硬编码，且文件在 .gitignore 中。
```

**所有条件必须匹配**才会触发规则。

## 事件类型

| 事件 | 触发条件 |
|------|----------|
| `bash` | Bash 工具命令 |
| `file` | Edit、Write、MultiEdit 工具 |
| `stop` | Claude 想要停止时（完成检查） |
| `prompt` | 用户提交提示时 |
| `all` | 所有事件 |

## 模式语法

使用 Python 正则表达式语法：

| 模式 | 匹配 | 示例 |
|------|------|------|
| `rm\s+-rf` | rm -rf | rm -rf /tmp |
| `console\.log\(` | console.log( | console.log("test") |
| `(eval\|exec)\(` | eval( 或 exec( | eval("code") |
| `\.env$` | 以 .env 结尾的文件 | .env, .env.local |
| `chmod\s+777` | chmod 777 | chmod 777 file.txt |

**提示：**
- 使用 `\s` 匹配空白
- 转义特殊字符：`\.` 匹配字面点
- 使用 `|` 表示 OR：`(foo|bar)`
- 使用 `.*` 匹配任意内容

## 使用示例

### 示例 1：阻止危险命令

```markdown
---
name: block-destructive-ops
enabled: true
event: bash
pattern: rm\s+-rf|dd\s+if=|mkfs|format
action: block
---

🛑 **检测到破坏性操作！**

此命令可能导致数据丢失。操作已阻止。
```

### 示例 2：警告调试代码

```markdown
---
name: warn-debug-code
enabled: true
event: file
pattern: console\.log\(|debugger;|print\(
action: warn
---

🐛 **检测到调试代码**

提交前请记得删除调试语句。
```

### 示例 3：停止前要求测试

```markdown
---
name: require-tests-run
enabled: false
event: stop
action: block
conditions:
  - field: transcript
    operator: not_contains
    pattern: npm test|pytest|cargo test
---

**未在对话中检测到测试！**

停止前请先运行测试验证变更。
```

## 高级用法

### 操作符参考

| 操作符 | 含义 |
|--------|------|
| `regex_match` | 正则匹配（最常用） |
| `contains` | 包含模式 |
| `equals` | 精确匹配 |
| `not_contains` | 不包含模式 |
| `starts_with` | 以...开头 |
| `ends_with` | 以...结尾 |

### 字段参考

**Bash 事件：**
- `command`：Bash 命令字符串

**File 事件：**
- `file_path`：被编辑的文件路径
- `new_text`：新添加的内容
- `old_text`：被替换的内容
- `content`：文件内容（Write 专属）

**Prompt 事件：**
- `user_prompt`：用户提交的提示文本

## 规则管理

### 启用/禁用规则

编辑 `.local.md` 文件，设置 `enabled: false` 或 `enabled: true`。

或使用交互工具：
```bash
/hookify:configure
```

### 删除规则

直接删除 `.local.md` 文件：
```bash
rm .claude/hookify.my-rule.local.md
```

### 查看所有规则

```bash
/hookify:list
```

## 前置要求

- Python 3.7+
- 无外部依赖（仅使用标准库）

## License

MIT License
