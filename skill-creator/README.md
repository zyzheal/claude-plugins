# skill-creator（技能创建器）

创建、改进和评估 Claude Code 技能的专用工具。提供结构化的技能开发流程，包含 YAML frontmatter、工作流定义和边界覆盖等最佳实践。

## 安装

```bash
/plugin install skill-creator@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/skill-creator ~/.claude/skills/skill-creator
```

## 使用说明

### 创建新技能

```
创建一个技能，用于 X
```

### 改进现有技能

```
改进 X 技能以更好地处理 Y 边界情况
```

### 运行技能评估

```
对 X 技能运行评估
```

## 功能特性

- ✅ 结构化的技能创建流程
- ✅ 正确的 YAML frontmatter 定义（name、description、trigger）
- ✅ 清晰的工作流步骤定义
- ✅ 边界情况和错误处理覆盖
- ✅ 基于 darwin-skill 的 8 维度质量评估

## 技能质量评估维度

| 维度 | 说明 |
|------|------|
| Frontmatter | 触发短语、使用时机、清晰描述 |
| 工作流清晰度 | 带明确目标和动作的分步流程 |
| 边界覆盖 | 边界情况、错误处理、失败模式 |
| 检查点设计 | 继续前的验证点 |
| 指令具体性 | 具体示例，而非模糊指导 |
| 资源整合 | 指向 CLAUDE.md、参考、工具的链接 |
| 整体架构 | 逻辑流程、最小冗余 |
| 实测表现 | 会话中的实际性能 |

## 文件结构

```
skill-creator/
├── .claude-plugin/plugin.json    # 插件清单
├── README.md                      # 本文件
└── skills/
    └── skill-creator/
        └── SKILL.md               # 技能定义
```

## License

MIT License
