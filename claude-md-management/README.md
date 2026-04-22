# CLAUDE.md 管理插件

维护和改善 CLAUDE.md 文件的专用工具集 -- 审计文件质量、捕获会话经验、保持项目记忆实时更新。

## 功能简介

本插件提供两个互补工具，分别用于不同场景：

| 工具 | claude-md-improver（技能） | /revise-claude-md（命令） |
|------|---------------------------|--------------------------|
| **用途** | 保持 CLAUDE.md 与代码库一致 | 捕获会话中的新发现 |
| **触发时机** | 代码库发生变更时 | 会话结束时 |
| **使用场景** | 定期维护 | 会话中发现了缺失的上下文信息 |

### CLAUDE.md 是什么？

CLAUDE.md 是项目根目录下的上下文提示文件，用于告知 Claude Code 项目的关键信息，包括：
- 项目结构和架构设计
- 构建和测试命令
- 编码规范和约定
- 重要配置和依赖关系

保持 CLAUDE.md 的最新状态，可以显著提升 Claude Code 在项目中的工作效率和准确性。

## 安装方法

### 通过插件市场安装

```bash
/plugin install claude-md-management@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/claude-md-management ~/.claude/plugins/local/claude-md-management
```

## 使用说明

### 技能：claude-md-improver

审计 CLAUDE.md 文件与当前代码库状态的一致性，给出质量评分和更新建议：

```
"审计我的 CLAUDE.md 文件"
"检查 CLAUDE.md 是否是最新的"
"audit my CLAUDE.md files"
"check if my CLAUDE.md is up to date"
```

该技能会：
1. 扫描项目中的 CLAUDE.md 文件
2. 对比文件内容与代码库实际状态
3. 给出质量评分（优秀/良好/需改进）
4. 提供具体的更新建议

### 命令：/revise-claude-md

在会话结束时使用，将本次会话中发现的新知识捕获并写入 CLAUDE.md：

```
/revise-claude-md
```

该命令会：
1. 回顾本次会话中的关键发现
2. 识别 CLAUDE.md 中缺失或过时的信息
3. 生成更新建议，经确认后写入文件

## 使用场景示例

### 场景一：项目结构变更后

当你添加了新模块、修改了构建流程或更新了依赖后：

```
"审计 CLAUDE.md 文件，确保反映最新的代码库结构"
```

### 场景二：长时间会话后

当你在一次会话中发现了项目中的重要信息（如隐藏的构建步骤、特殊的测试要求）：

```
/revise-claude-md
```

### 场景三：新成员加入项目

新成员可以通过审计 CLAUDE.md 来确认项目文档的完整性：

```
"检查一下这个项目的 CLAUDE.md 质量"
```

## 注意事项

- CLAUDE.md 文件应保持在项目根目录，文件名固定为 `CLAUDE.md`
- `/revise-claude-md` 命令会修改文件内容，建议在执行前确认变更
- 定期审计可以防止文档与实际代码库脱节
- 对于多包仓库（monorepo），每个包可以有独立的 CLAUDE.md 文件

## 作者

Isabella He (isabella@anthropic.com)
