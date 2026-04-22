# Security Guidance Plugin

## 概述
安全提醒钩子，在编辑文件时自动检测并警告潜在的安全问题。

## 安装
```
/plugin install security-guidance@claude-plugins-official
```

## 激活
通过 Claude Code hooks 系统自动触发，无需手动操作。

## 检测的安全问题
| 问题类型 | 说明 |
|----------|------|
| 命令注入 | 未验证的用户输入拼接进 shell 命令 |
| XSS | 未转义的用户输入直接输出到 HTML |
| SQL 注入 | 字符串拼接的 SQL 查询 |
| 路径遍历 | 未验证的文件路径操作 |
| 敏感信息泄露 | API key、密码等硬编码 |
| 不安全的反序列化 | 不可信数据的反序列化操作 |

## 钩子配置
钩子文件位于 `hooks/` 目录，在 Claude Code 保存或编辑文件时自动执行安全检查。

## 参数
无需手动参数，自动检测。

## 依赖
- Claude Code hooks 系统
- 需在 settings.json 中启用钩子

## 示例
当 Claude Code 尝试写入包含 `exec(user_input)` 的代码时，自动弹出安全警告。
