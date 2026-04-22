# Playwright Plugin

## 概述
Microsoft Playwright 浏览器自动化和端到端测试 MCP 服务器。Claude Code 可与之交互，执行网页截图、填写表单、点击元素等操作。

## 安装
```
/plugin install playwright@claude-plugins-official
```

## 激活
安装后自动注册为 MCP 服务器。

## 使用方法
Claude Code 通过 MCP 工具与浏览器交互：

**可用操作：**
- 导航到 URL
- 截图
- 填写表单字段
- 点击元素
- 获取页面文本
- 执行 JavaScript

**典型场景：**
- 验证 UI 变更
- E2E 测试
- 网页内容抓取
- 表单自动化

## 参数
| 参数 | 说明 |
|------|------|
| URL | 要访问的页面 |
| selector | CSS/XPath 选择器 |
| action | 操作类型（click/fill/screenshot 等） |

## 依赖
- Playwright 浏览器驱动
- MCP 服务器

## 示例
```
（Claude Code 自动调用 MCP 工具）
打开登录页面并截图
帮我测试注册流程
检查页面元素是否存在
```
