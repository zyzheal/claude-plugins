# mcp-server-dev（MCP 服务器开发）

用于设计和构建 MCP（Model Context Protocol）服务器的技能集合，帮助开发者创建与 Claude 无缝协作的 MCP 服务。

## 功能概述

包含 3 个技能，组成完整的 MCP 服务器构建流程：

| 技能 | 用途 |
|------|------|
| **`build-mcp-server`** | 入口技能。分析使用场景，选择部署模型（远程 HTTP / MCPB / 本地 stdio），设计工具模式 |
| **`build-mcp-app`** | 添加交互式 UI 组件（表单、选择器、确认对话框），在聊天中内联渲染 |
| **`build-mcpb`** | 打包本地 stdio 服务器及其运行时，用户无需安装 Node/Python 即可使用 |

## 安装

```bash
/plugin install mcp-server-dev@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/mcp-server-dev ~/.claude/plugins/local/mcp-server-dev
```

## 使用说明

### 自然语言触发

```
"帮我构建一个 MCP 服务器"
"设计一个 MCP 工具"
"打包一个 MCPB 应用"
"为我的 API 创建 MCP 服务器"
```

### 命令触发

```bash
/mcp-server-dev:build-mcp-server
```

## 工作流程

`build-mcp-server` 是入口点，它会询问以下问题来推荐最佳路径：

1. 你要连接什么服务？
2. 谁会使用它？
3. 工具操作面有多大？
4. 是否需要聊天内 UI？

根据回答推荐以下路径之一：

- **远程 streamable-HTTP**（默认推荐，适合包装云 API）— 内联脚手架
- **MCP 应用** — 转交 `build-mcp-app`
- **MCPB** — 转交 `build-mcpb`
- **本地 stdio 原型** — 内联脚手架，附带 MCPB 升级说明

## 部署模式对比

| 模式 | 适用场景 | 优点 |
|------|----------|------|
| 远程 HTTP | 云 API 封装 | 无需本地安装，跨平台 |
| MCPB | 需要本地访问的工具 | 自带运行时，零依赖 |
| 本地 stdio | 原型开发 | 快速迭代，简单调试 |

## 包含的参考文件

每个技能都包含参考文件：

- 认证流程（DCR/CIMD）
- 工具描述编写指南
- UI 组件模板
- Manifest 模式定义
- 安全加固指南

## 最佳实践

1. **优先选择远程 HTTP**：除非必须访问本地资源，否则推荐远程部署
2. **清晰的工具描述**：工具描述是 Claude 理解工具功能的关键
3. **安全优先**：遵循安全加固指南，避免暴露敏感操作
4. **渐进式开发**：先用 stdio 原型验证，再打包为 MCPB 或部署远程

## 注意事项

- MCP 服务器需要遵循 [MCP 规范](https://modelcontextprotocol.io/)
- 远程部署需要处理认证和授权
- MCPB 打包需要目标平台的运行时环境

## License

MIT License
