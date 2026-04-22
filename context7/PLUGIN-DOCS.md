# Context7 Plugin

## 概述
Upstash Context7 MCP 服务器，提供最新文档查询功能。直接从源码仓库拉取版本特定的文档和代码示例。

## 安装
```
/plugin install context7@claude-plugins-official
```

## 激活
安装后自动注册为 MCP 服务器。

## MCP 配置
```json
{
  "context7": {
    "command": "npx",
    "args": ["-y", "@upstash/context7-mcp"]
  }
}
```

## 使用方法
Claude Code 在需要查询最新文档时自动调用 Context7 MCP。

**典型场景：**
- 查询某个库的最新 API 文档
- 获取特定版本的使用示例
- 解决版本迁移问题

## 参数
| 参数 | 说明 |
|------|------|
| library | 要查询的库名称 |
| version | 可选，指定版本号 |

## 依赖
- Node.js (用于 npx)
- 网络连接

## 示例
```
（Claude Code 自动调用，无需手动触发）
当用户问"React 19 的 Suspense 怎么用"时，自动从 Context7 拉取最新文档
```
