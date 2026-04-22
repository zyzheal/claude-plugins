# security-guidance

Security reminder hook that warns about potential security issues when editing files, including command injection, XSS, and unsafe code patterns.

## Installation

```bash
/plugin install security-guidance@claude-plugins-official
```

### Manual
```bash
ln -s /path/to/security-guidance ~/.claude/plugins/local/security-guidance
```

## How It Works

This plugin installs a pre-commit/pre-edit hook that scans file changes for common security anti-patterns and warns the user before committing.

### Detected Patterns

| Category | Examples |
|----------|----------|
| Command Injection | `exec()`, `eval()`, string interpolation in shell commands |
| XSS | `innerHTML`, `dangerouslySetInnerHTML`, unescaped template output |
| SQL Injection | String concatenation in SQL queries |
| Insecure Crypto | `Math.random()`, weak hashing (MD5, SHA1 for passwords) |
| Secrets in Code | Hardcoded API keys, tokens, passwords |
| Unsafe File Ops | World-readable permissions, symlink attacks |

## Configuration

Edit the hook configuration in `hooks/` to customize which patterns to check:

```bash
# View current hooks
ls hooks/

# Disable a specific check
# Edit the hook file and comment out the relevant pattern
```

## Parameters

No user-facing parameters. The hook runs automatically when file edits are made.

### Manual Check

Run a security scan on the current working tree:
```bash
# The hook will automatically scan on next edit
```
