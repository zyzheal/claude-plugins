# playwright（Playwright 浏览器自动化）

基于 Microsoft Playwright 的浏览器自动化和端到端测试 MCP 服务器。使 Claude 能够与网页交互、截图、填写表单、点击元素，以及执行自动化浏览器测试工作流。

## 功能特性

- ✅ 网页导航和内容提取
- ✅ 自动化截图（支持全页面和指定分辨率）
- ✅ 表单填写和提交
- ✅ 元素点击和悬停操作
- ✅ JavaScript 执行
- ✅ 文本内容提取
- ✅ 端到端测试工作流
- ✅ 视觉回归测试

## 安装

```bash
/plugin install playwright@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/playwright ~/.claude/plugins/local/playwright
```

### 前置要求

```bash
# 安装 Chromium 浏览器
npx playwright install chromium
```

## MCP 配置

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/playwright-mcp"]
    }
  }
}
```

## 可用工具

| 工具 | 描述 | 参数 |
|------|------|------|
| `browser_navigate` | 导航到指定 URL | `url` (字符串) |
| `browser_screenshot` | 截取当前页面截图 | `width`, `height`, `fullPage` |
| `browser_click` | 点击元素 | `selector` (CSS 选择器) |
| `browser_fill` | 填写表单字段 | `selector`, `value` |
| `browser_hover` | 悬停在元素上 | `selector` |
| `browser_select` | 下拉菜单选择 | `selector`, `value` |
| `browser_evaluate` | 执行 JavaScript | `script` (JS 代码) |
| `browser_get_text` | 提取文本内容 | `selector` |

## 使用示例

### 端到端测试

```
测试 /login 的登录表单：
1. 导航到 http://localhost:3000/login
2. 填写 email 为 "test@example.com"
3. 填写 password 为 "password123"
4. 点击提交按钮
5. 验证是否重定向到仪表盘
```

### 视觉回归测试

```
截取首页 1920x1080 截图：
1. 导航到 http://localhost:3000
2. 以 1920x1080 分辨率截图
```

### 表单自动化

```
填写注册表单：
1. 导航到 http://localhost:3000/register
2. 填写用户名为 "testuser"
3. 填写邮箱为 "test@example.com"
4. 勾选同意条款
5. 点击注册按钮
```

## 自然语言触发

```
"帮我测试这个网页的登录功能"
"截取这个页面的截图"
"自动化填写这个表单"
"检查页面元素是否存在"
"执行端到端测试"
```

## 常见问题

### 浏览器找不到

```bash
npx playwright install
```

### 超时错误

在 MCP 配置中增加超时时间。

### 无头模式问题

在配置中设置 `headless: true`。

## 注意事项

- 确保目标网页可访问
- 对于需要登录的页面，先手动完成认证
- 动态加载的内容可能需要等待时间

## License

MIT License
