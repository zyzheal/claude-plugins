# session-report

Generate explorable HTML reports of Claude Code session usage — tokens, cache efficiency, subagent activity, skills used, and expensive prompts.

## Installation

```bash
/plugin install session-report@claude-plugins-official
```

### Manual
```bash
ln -s /path/to/session-report ~/.claude/plugins/local/session-report
```

## Usage

### Via Skill

```
Generate a session report for the last 7 days
```

Or trigger with any of these phrases:
- "session report"
- "token usage"
- "cache analysis"
- "usage report"
- "expensive prompts"
- "session analytics"

### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--since` | `7d` | Time window: `24h`, `7d`, `30d`, `all` |
| `--json` | false | Output raw JSON instead of HTML |
| `--output` | `./report.html` | Output file path |

### Examples

```bash
# Last 7 days (default)
node skills/session-report/analyze-sessions.mjs --json --since 7d

# All-time report
node skills/session-report/analyze-sessions.mjs --json

# Specific time window
node skills/session-report/analyze-sessions.mjs --json --since 30d
```

## Report Contents

The HTML report includes:
- **Token usage** — Input/output tokens per session, total spend
- **Cache efficiency** — Cache hit/miss ratios, savings
- **Subagent activity** — Number of agents spawned, success rate
- **Skills used** — Most frequently triggered skills
- **Expensive prompts** — Highest token-consuming operations
- **Session timeline** — Activity over time

## Requirements

- Node.js 18+
- Access to `~/.claude/projects/` transcript directory
