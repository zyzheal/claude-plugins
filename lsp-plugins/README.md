# lsp-plugins

Bundle of 11 LSP (Language Server Protocol) language server integrations for Claude Code.

## Included Plugins

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

## Installation

Install individual language servers as needed:

```bash
/plugin install pyright-lsp@claude-plugins-official
/plugin install typescript-lsp@claude-plugins-official
```

Or install all at once:

```bash
for lang in clangd csharp gopls jdtls kotlin lua php pyright ruby swift typescript; do
  /plugin install ${lang}-lsp@claude-plugins-official
done
```

## Configuration

Each LSP plugin reads its language server from your system PATH. Install the language server separately:

```bash
# Python
pip install pyright

# TypeScript
npm install -g typescript-language-server typescript

# Go
go install golang.org/x/tools/gopls@latest
```

## How LSP Works

1. Claude Code detects the file type (e.g., `.py`, `.ts`, `.rs`)
2. The matching LSP plugin activates
3. It connects to the language server via stdio
4. Provides: go-to-definition, hover info, diagnostics, completions, rename
