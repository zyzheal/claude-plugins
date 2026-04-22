# code-simplifier

Agent that simplifies and refines code for clarity, consistency, and maintainability while preserving functionality.

## Overview

The code-simplifier agent reviews changed code and identifies opportunities to improve readability, reduce duplication, and align with project conventions — without altering behavior.

## Installation

### Via Plugin Marketplace
```bash
/plugin install code-simplifier@claude-plugins-official
```

### Manual
Copy this directory to your plugins folder or create a symlink:
```bash
ln -s /path/to/code-simplifier ~/.claude/plugins/local/code-simplifier
```

## Usage

The agent is invoked automatically when code changes are detected. It analyzes the diff and suggests simplifications.

### Trigger Manually

Ask Claude Code to use the code-simplifier agent:
```
Simplify the recent changes using the code-simplifier agent
```

### What It Checks

- **Redundant code** — Unused variables, imports, dead branches
- **Abstraction opportunities** — Repeated patterns that should be extracted
- **Naming clarity** — Variables/functions that could be more descriptive
- **Complexity reduction** — Nested conditionals, long functions
- **Convention alignment** — Style consistency with existing code

## Agent Configuration

The agent definition is in `agents/code-simplifier.md`. It specifies:
- Allowed tools (Read, Grep, Glob, Edit, Bash)
- Analysis patterns
- Output format

## Requirements

- Claude Code with agent support enabled
- Git repository (for diff analysis)
