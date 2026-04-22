# Context7 文档查询插件

Upstash Context7 MCP 服务器 -- 用于实时查询最新技术文档。直接从源代码仓库拉取版本特定的文档和代码示例，注入到你的 LLM 上下文中。

## 功能简介

Context7 是一个 MCP（Model Context Protocol）服务器，让 Claude Code 能够：

- **查询最新文档** -- 获取与代码库版本匹配的准确文档
- **获取代码示例** -- 直接从官方仓库提取真实可用的代码片段
- **版本感知** -- 区分不同版本的 API 差异，避免过时信息
- **自动触发** -- Claude Code 在需要文档时自动调用，无需手动操作

相比依赖训练数据中的过时知识，Context7 能确保获取的文档是当前最新有效的版本。

## 安装方法

### 通过插件市场安装

```bash
/plugin install context7@claude-plugins-official
```

### MCP 配置

将以下配置添加到 `~/.claude/settings.json` 或项目根目录的 `.mcp.json`：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

## 使用说明

安装配置完成后，Claude Code 会在需要查询文档时自动调用 Context7，你也可以手动触发。

### 可用工具

| 工具 | 描述 | 参数 |
|------|------|------|
| `resolve-library-id` | 查找库的 Context7 ID | `libraryName`（字符串） |
| `get-library-docs` | 获取特定库的文档 | `libraryId`、`topic`（可选） |

### 使用示例

**示例一：查询 React Hooks 用法**

```
问题："如何使用 React useEffect 的清理函数？"
→ resolve-library-id("React") → get-library-docs("react", "useEffect cleanup")
```

**示例二：查询 Vue 3 组合式 API**

```
问题："Vue 3 的 ref 和 reactive 有什么区别？"
→ resolve-library-id("Vue.js") → get-library-docs("vuejs", "ref vs reactive")
```

**示例三：查询 Next.js 路由**

```
问题："Next.js 14 App Router 如何实现动态路由？"
→ resolve-library-id("Next.js") → get-library-docs("nextjs", "dynamic routes")
```

### 手动触发查询

你也可以直接要求 Claude 查询特定库的文档：

```
"查一下最新的 Express.js 中间件文档"
"帮我找 Tailwind CSS v4 的配置方法"
"搜索 Zod 的 schema 验证示例"
```

## 系统要求

- Node.js 18+（用于 npx 执行）
- 网络连接（需要从源代码仓库远程拉取文档）

## 注意事项

- Context7 需要联网，文档是从远程仓库实时获取的
- 查询结果依赖于 Context7 索引库的覆盖范围
- 对于非常小众或新发布的库，可能需要等待被索引
- 建议与 Claude 的内置知识结合使用，互为补充
