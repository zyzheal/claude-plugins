# context7

Upstash Context7 MCP server for up-to-date documentation lookup. Pull version-specific documentation and code examples directly from source repositories into your LLM context.

## Installation

```bash
/plugin install context7@claude-plugins-official
```

## MCP Configuration

Add to your `~/.claude/settings.json` or project `.mcp.json`:

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

## Usage

Claude Code automatically invokes Context7 when it needs to look up current documentation.

### Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `resolve-library-id` | Find a library's Context7 ID | `libraryName` (string) |
| `get-library-docs` | Get docs for a specific library version | `libraryId`, `topic` (optional) |

### Example

```
Query: "How do I use React useEffect with cleanup?"
→ resolve-library-id("React") → get-library-docs("react", "useEffect cleanup")
```

## Requirements

- Node.js 18+ (for npx)
- Internet access (fetches docs from source repositories)
