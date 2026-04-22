---
name: session-report
description: >-
  Generate an explorable HTML report of Claude Code session usage (tokens, cache, subagents, skills, expensive prompts) from ~/.claude/projects transcripts.
  Use when: analyzing Claude Code token usage, finding expensive prompts, reviewing cache performance, or generating a visual usage report.
  Triggers: "session report", "token usage", "cache analysis", "usage report", "expensive prompts", "session analytics"
---

# Session Report

Produce a self-contained HTML report of Claude Code usage and save it to the current working directory.

## Steps

1. **Get data.** Run the bundled analyzer (default window: last 7 days; honor a different range if the user passed one, e.g. `24h`, `30d`, or `all`). The script `analyze-sessions.mjs` lives in the same directory as this SKILL.md — use its absolute path:
   ```sh
   node <skill-dir>/analyze-sessions.mjs --json --since 7d > /tmp/session-report.json
   ```
   For all-time, omit `--since`.

2. **Read** `/tmp/session-report.json`. Skim `overall`, `by_project`, `by_subagent_type`, `by_skill`, `cache_breaks`, `top_prompts`.

3. **Copy the template** (also bundled alongside this SKILL.md) to the output path in the current working directory:
   ```sh
   cp <skill-dir>/template.html ./session-report-$(date +%Y%m%d-%H%M).html
   ```

4. **Edit the output file** (use Edit, not Write — preserve the template's JS/CSS):
   - Replace the contents of `<script id="report-data" type="application/json">` with the full JSON from step 1. The page's JS renders the hero total, all tables, bars, and drill-downs from this blob automatically.
   - Fill the `<!-- AGENT: anomalies -->` block with **3–5 one-line findings**. Express figures as a **% of total tokens** wherever possible (total = `overall.input_tokens.total + overall.output_tokens`). One line per finding, exact markup:
     ```html
     <div class="take bad"><div class="fig">41.2%</div><div class="txt"><b>cc-monitor</b> consumed 41% of the week across just 3 sessions</div></div>
     ```
     Classes: `.take bad` for waste/anomalies (red), `.take good` for healthy signals (green), `.take info` for neutral facts (blue). The `.fig` is one short number (a %, a count, or a multiplier like `12×`). The `.txt` is one plain-English sentence naming the project/skill/prompt; wrap the subject in `<b>`. Look for: a project or skill eating a disproportionate share, cache-hit <85%, a single prompt >2% of total, subagent types averaging >1M tokens/call, cache breaks clustering.
   - Fill the `<!-- AGENT: optimizations -->` block (at the **bottom** of the page) with 1–4 `<div class="callout">` suggestions tied to specific rows (e.g. "`/weekly-status` spawned 7 subagents for 8.1% of total — scope it to fewer parallel agents").
   - Do not restructure existing sections.

5. **Report** the saved file path to the user. Do not open it or render it.

## When to Use This Skill

- User asks to analyze their Claude Code token usage or session history
- User wants to find expensive prompts or identify cache performance issues
- User requests a visual report of subagent usage, skill usage, or prompt costs

## Workflow

1. **Run the analyzer** with the appropriate time window (default 7d, or user-specified)
2. **Read the JSON output** and skim key sections (overall, by_project, top_prompts, cache_breaks)
3. **Copy the HTML template** to the output path in the current working directory
4. **Edit the output file** -- embed JSON data, write 3-5 anomaly findings, add optimization suggestions
5. **Report the file path** to the user without opening or rendering it

## Error Handling

- If `analyze-sessions.mjs` fails with no data: check that `~/.claude/projects` has transcript files; suggest using `--since all` if no recent sessions
- If the JSON is >2MB: trim `top_prompts` to 100 entries and `cache_breaks` to 100 before embedding
- If the template file is missing: verify the skill directory contains `template.html` alongside this SKILL.md
- If anomalies are sparse: still provide at least 1 factual finding; it's OK if nothing is alarming

## Notes

- The template is the source of interactivity (sorting, expand/collapse, block-char bars). Your job is data + narrative, not markup.
- Keep commentary terse and specific — reference actual project names, numbers, timestamps from the JSON.
- `top_prompts` already includes subagent tokens and rolls task-notification continuations into the originating prompt.
- If the JSON is >2MB, trim `top_prompts` to 100 entries and `cache_breaks` to 100 before embedding (they should already be capped).
