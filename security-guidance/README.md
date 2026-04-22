# security-guidance（安全指导）

安全提醒 Hook 插件，在编辑文件时自动扫描潜在的安全问题，包括命令注入、XSS、不安全的代码模式等，帮助开发者在编码过程中及时发现并修复安全隐患。

## 功能特性

- ✅ 实时安全扫描：编辑文件时自动检测安全问题
- ✅ 多类别检测：覆盖 OWASP Top 10 常见漏洞
- ✅ 自动警告：发现问题时立即提醒
- ✅ 可自定义：支持禁用特定检测项

## 安装

```bash
/plugin install security-guidance@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/security-guidance ~/.claude/plugins/local/security-guidance
```

## 检测的安全模式

| 类别 | 示例 |
|------|------|
| **命令注入** | `exec()`、`eval()`、Shell 命令中的字符串插值 |
| **XSS** | `innerHTML`、`dangerouslySetInnerHTML`、未转义的模板输出 |
| **SQL 注入** | SQL 查询中的字符串拼接 |
| **不安全的加密** | `Math.random()`、弱哈希（MD5、SHA1 用于密码） |
| **代码中的密钥** | 硬编码的 API 密钥、令牌、密码 |
| **不安全的文件操作** | 全局可读权限、符号链接攻击 |

## 工作原理

1. 安装后，插件会自动注册为编辑 Hook
2. 每次文件编辑时，Hook 自动扫描更改的内容
3. 发现安全反模式时，向用户发出警告
4. 用户可以在提交前修复问题

## 配置

### 自定义检测规则

编辑 `hooks/` 目录下的 Hook 文件：

```bash
# 查看当前 Hook
ls hooks/

# 禁用特定检测
# 编辑 Hook 文件，注释掉对应的模式匹配行
```

### 手动触发扫描

无需手动触发，Hook 会在下次编辑时自动运行。

## 使用示例

```
# 正常编码过程中，如果写了：
app.get('/user', (req, res) => {
  const user = db.query(`SELECT * FROM users WHERE id = ${req.query.id}`)
  // Hook 会警告：SQL 注入风险，建议使用参数化查询
})

# 如果写了：
document.getElementById('output').innerHTML = userInput
// Hook 会警告：XSS 风险，建议使用 textContent 或转义
```

## 注意事项

- Hook 自动运行，无需手动触发
- 警告仅供参考，不会阻止编辑操作
- 建议结合专业的安全扫描工具使用
- 对于误报，可以在 Hook 配置中排除特定模式

## License

MIT License
