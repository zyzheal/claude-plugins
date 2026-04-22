Kotlin language server for Claude Code, providing code intelligence, refactoring, and analysis.

## Supported Extensions
`.kt`
`.kts`

## Installation

Install the Kotlin LSP CLI.

```bash
brew install JetBrains/utils/kotlin-lsp
```

## Usage

Once installed, the language server will automatically activate for Kotlin files (`.kt`, `.kts`) in your workspace. It provides:

- **Code completion** - Context-aware suggestions as you type
- **Go to definition** - Jump to symbol definitions with a single command
- **Find references** - Locate all usages of a symbol across the project
- **Rename refactoring** - Safe rename with all references updated
- **Symbol search** - Quick navigation to any symbol by name
- **Diagnostics** - Real-time error and warning detection

## Configuration

No additional configuration required. The plugin auto-detects Kotlin projects and initializes the language server.

## More Information
- [kotlin LSP](https://github.com/Kotlin/kotlin-lsp)
