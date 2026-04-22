# playwright

Microsoft Playwright browser automation and E2E testing MCP server. Enables Claude to interact with web pages, take screenshots, fill forms, click elements, and perform automated browser testing workflows.

## Installation

```bash
/plugin install playwright@claude-plugins-official
```

## MCP Configuration

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

### Prerequisites

```bash
npx playwright install chromium
```

## Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `browser_navigate` | Navigate to a URL | `url` (string) |
| `browser_screenshot` | Capture current page screenshot | `width`, `height`, `fullPage` |
| `browser_click` | Click an element | `selector` (CSS selector) |
| `browser_fill` | Fill a form field | `selector`, `value` |
| `browser_hover` | Hover over an element | `selector` |
| `browser_select` | Select from dropdown | `selector`, `value` |
| `browser_evaluate` | Execute JavaScript | `script` (JS code) |
| `browser_get_text` | Extract text content | `selector` |

## Typical Workflows

### E2E Testing
```
Test the login form at /login:
1. Navigate to http://localhost:3000/login
2. Fill email with "test@example.com"
3. Fill password with "password123"
4. Click the submit button
5. Verify redirect to dashboard
```

### Visual Regression
```
Take a screenshot of the homepage at 1920x1080:
1. Navigate to http://localhost:3000
2. Screenshot at 1920x1080
```

## Troubleshooting

- **Browser not found**: Run `npx playwright install`
- **Timeout errors**: Increase timeout in MCP config
- **Headless issues**: Set `headless: true` in config
