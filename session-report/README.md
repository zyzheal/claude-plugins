# session-report（会话报告）

生成可探索的 HTML 格式的 Claude Code 会话使用报告，包含 Token 消耗、缓存效率、子 Agent 活动、技能使用和昂贵提示等详细分析。

## 功能特性

- ✅ **Token 用量**：每次会话的输入/输出 Token 数和总花费
- ✅ **缓存效率**：缓存命中率分析、节省量计算
- ✅ **子 Agent 活动**：生成的 Agent 数量、成功率
- ✅ **技能使用**：最常触发的技能统计
- ✅ **昂贵提示**：最高 Token 消耗的操作
- ✅ **会话时间线**：随时间变化的活动趋势

## 安装

```bash
/plugin install session-report@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/session-report ~/.claude/plugins/local/session-report
```

## 使用说明

### 自然语言触发

```
"生成一份会话报告"
"分析最近 7 天的 Token 使用情况"
"查看缓存效率"
"生成使用报告"
"查看最昂贵的提示"
"会话分析"
```

### 触发词

以下关键词会自动触发：

- "session report"、"会话报告"
- "token usage"、"Token 用量"
- "cache analysis"、"缓存分析"
- "usage report"、"使用报告"
- "expensive prompts"、"昂贵提示"
- "session analytics"、"会话分析"

### 命令行参数

| 参数 | 默认值 | 描述 |
|------|--------|------|
| `--since` | `7d` | 时间窗口：`24h`、`7d`、`30d`、`all` |
| `--json` | false | 输出原始 JSON 而非 HTML |
| `--output` | `./report.html` | 输出文件路径 |

### 示例

```bash
# 最近 7 天的报告（默认）
node skills/session-report/analyze-sessions.mjs --since 7d

# 全部历史报告
node skills/session-report/analyze-sessions.mjs --since all

# 最近 30 天报告
node skills/session-report/analyze-sessions.mjs --since 30d

# 输出 JSON 格式
node skills/session-report/analyze-sessions.mjs --json --since 7d

# 自定义输出路径
node skills/session-report/analyze-sessions.mjs --output ./my-report.html
```

## 报告内容

生成的 HTML 报告包含：

1. **Token 用量概览** - 总输入/输出 Token、费用估算
2. **缓存效率分析** - 缓存命中率、节省的 Token 数
3. **子 Agent 活动** - 生成的 Agent 数量、成功率、运行时间
4. **技能使用统计** - 最常使用的技能排名
5. **昂贵提示分析** - Token 消耗最高的操作
6. **会话时间线** - 随时间变化的活动趋势图

## 前置要求

- Node.js 18+
- 可访问 `~/.claude/projects/` 会话记录目录

## 常见问题

### 找不到会话数据

确保 `~/.claude/projects/` 目录下有会话记录文件。

### HTML 报告无法打开

报告是独立的 HTML 文件，可以在任何浏览器中打开。

## License

MIT License
