# skill-creator

Create, improve, and measure Claude Code skills.

## Installation

```bash
/plugin install skill-creator
```

Or manually symlink:
```bash
ln -s /path/to/claude-plugins/skill-creator ~/.claude/skills/skill-creator
```

## Usage

### Create a new skill
```
Create a skill that helps Claude do X
```

### Improve an existing skill
```
Improve the X skill to handle Y edge case better
```

### Run skill evaluation
```
Run evals on the X skill
```

## What This Plugin Provides

- **skill-creator** skill — Guides you through creating well-structured skills with proper frontmatter, workflow definitions, and boundary coverage
- Supports skill quality measurement via darwin-skill's 8-dimension rubric

## Skill Quality Dimensions

| Dimension | Description |
|-----------|-------------|
| Frontmatter | Trigger phrases, use-when conditions, clear description |
| Workflow clarity | Step-by-step process with clear goals and actions |
| Boundary coverage | Edge cases, error handling, failure modes |
| Checkpoint design | Verification points before proceeding |
| Instruction specificity | Concrete examples, not vague guidance |
| Resource integration | Links to CLAUDE.md, references, tools |
| Overall architecture | Logical flow, minimal redundancy |
| 实测表现 | Real-world performance in sessions |

## Commands

None — this plugin provides a skill only. Invoke by saying "create a skill" or describing what skill you need.

## Files

```
skill-creator/
├── .claude-plugin/plugin.json    # Plugin manifest
├── README.md                      # This file
└── skills/
    └── skill-creator/
        └── SKILL.md               # The skill definition
```
