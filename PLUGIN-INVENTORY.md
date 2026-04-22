# Plugin Inventory

All installed plugins exported to `/Users/heal/claude-plugins/`.

## Overview

| # | Plugin | Source | Type | Skills | Agents | Commands | Description |
|---|--------|--------|------|--------|--------|----------|-------------|
| 1 | [architect-collaboration](./architect-collaboration/) | zyzheal-plugins | Workflow | 0 | 0 | 2 | 4-phase development process: Requirements → Design → Breakdown → Feature Dev |
| 2 | [claude-code-setup](./claude-code-setup/) | Official | Automation | 1 | 0 | 0 | Analyze codebase and recommend tailored automations |
| 3 | [claude-hud](./claude-hud/) | zyzheal-plugins | HUD/Statusline | 0 | 0 | 2 | Real-time statusline HUD with context health tracking |
| 4 | [claude-md-management](./claude-md-management/) | Official | Maintenance | 1 | 0 | 1 | Audit and improve CLAUDE.md project memory files |
| 5 | [cli-anything](./cli-anything/) | CLI-Anything | Hub | 0 | 0 | 5 | Build stateful CLI interfaces for any GUI application |
| 6 | [code-review](./code-review/) | Official | Review | 0 | 0 | 1 | Automated PR review with multi-agent confidence scoring |
| 7 | [code-simplifier](./code-simplifier/) | Official | Refactoring | 0 | 1 | 0 | Simplify code for clarity while preserving functionality |
| 8 | [commit-commands](./commit-commands/) | Official | Git | 0 | 0 | 3 | Commit, push, and create PRs with streamlined commands |
| 9 | [content-create](./content-create/) | Local | Content | 1 | 5 | 3 | Intelligent content creation workflow with auto-publishing |
| 10 | [context7](./context7/) | Official | MCP Server | 0 | 0 | 0 | Up-to-date documentation lookup via MCP |
| 11 | [darwin-skill](./darwin-skill/) | Local | Optimizer | 1 | 0 | 0 | 8-dimension skill evaluator and auto-optimizer |
| 12 | [dev-enegine](./dev-enegine/) | zyzheal-plugins | Dev Engine | 0 | 4 | 4 | Multi-agent协作系统: 规划→编码→测试 全流程 |
| 13 | [feature-dev](./feature-dev/) | Official | Dev Workflow | 0 | 3 | 1 | Feature dev with code exploration, architecture, review agents |
| 14 | [frontend-design](./frontend-design/) | Official | UI/UX | 1 | 0 | 0 | UI/UX implementation skill |
| 15 | [hookify](./hookify/) | Official | Hooks | 1 | 1 | 4 | Create hooks to prevent unwanted behaviors |
| 16 | [long-running-agent](./long-running-agent/) | zyzheal-plugins | Agent System | 0 | 3 | 1 | Dual-track agent system for incremental development |
| 17 | [math-olympiad](./math-olympiad/) | Official | Math Solver | 1 | 0 | 0 | Competition math solver with adversarial verification |
| 18 | [mcp-server-dev](./mcp-server-dev/) | Official | MCP Dev | 3 | 0 | 0 | Build MCP servers: remote HTTP, MCPB, local deployment |
| 19 | [playground](./playground/) | Official | Demo | 1 | 0 | 0 | Interactive HTML playgrounds with live preview |
| 20 | [playwright](./playwright/) | Official | Testing | 0 | 0 | 0 | Browser automation and E2E testing via MCP |
| 21 | [pr-review-toolkit](./pr-review-toolkit/) | Official | Review Suite | 0 | 6 | 1 | Comprehensive PR review with specialized agents |
| 22 | [rust-analyzer-lsp](./rust-analyzer-lsp/) | Official | LSP | 0 | 0 | 0 | Rust language server integration |
| 23 | [security-guidance](./security-guidance/) | Official | Security | 0 | 0 | 0 | Security warnings for unsafe code patterns |
| 24 | [session-report](./session-report/) | Official | Reporting | 1 | 0 | 0 | Generate session summaries and reports |
| 25 | [skill-creator](./skill-creator/) | Official | Skill Dev | 1 | 3 | 0 | Create, update, and evaluate skills |
| 26 | [superpowers](./superpowers/) | Official | Core Skills | 14 | 1 | 3 | TDD, debugging, collaboration patterns |
| 27 | [lsp-plugins](./lsp-plugins/) | Official | LSP Bundle | 0 | 0 | 0 | 11 LSP language servers (see below) |

## LSP Plugins Bundle

All 11 LSP plugins in `./lsp-plugins/`:

| Plugin | Language | LSP Server | Install Command |
|--------|----------|------------|-----------------|
| clangd-lsp | C/C++ | clangd | `/plugin install clangd-lsp@claude-plugins-official` |
| csharp-lsp | C# | OmniSharp | `/plugin install csharp-lsp@claude-plugins-official` |
| gopls-lsp | Go | gopls | `/plugin install gopls-lsp@claude-plugins-official` |
| jdtls-lsp | Java | Eclipse JDT | `/plugin install jdtls-lsp@claude-plugins-official` |
| kotlin-lsp | Kotlin | kotlin-language-server | `/plugin install kotlin-lsp@claude-plugins-official` |
| lua-lsp | Lua | lua-language-server | `/plugin install lua-lsp@claude-plugins-official` |
| php-lsp | PHP | phpactor | `/plugin install php-lsp@claude-plugins-official` |
| pyright-lsp | Python | pyright | `/plugin install pyright-lsp@claude-plugins-official` |
| ruby-lsp | Ruby | ruby-lsp | `/plugin install ruby-lsp@claude-plugins-official` |
| swift-lsp | Swift | sourcekit-lsp | `/plugin install swift-lsp@claude-plugins-official` |
| typescript-lsp | TypeScript/JS | typescript-language-server | `/plugin install typescript-lsp@claude-plugins-official` |
