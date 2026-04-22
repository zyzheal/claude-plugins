# Claude Code 配置分析插件

分析代码库并推荐量身定制的 Claude Code 自动化方案 -- 包括 Hooks、Skills、MCP 服务器、子代理和斜杠命令。

## 功能简介

Claude Code 配置分析插件会扫描你的代码库，并在以下每个类别中推荐 1-2 个最适合的自动化方案：

- **MCP 服务器** -- 外部集成（如 context7 用于文档查询、Playwright 用于前端测试）
- **Skills** -- 封装的专业知识（如 Plan 代理、frontend-design 技能）
- **Hooks** -- 自动化操作（如自动格式化、自动 lint、阻止敏感文件）
- **子代理** -- 专业代码审查员（安全审查、性能分析、无障碍检查）
- **斜杠命令** -- 快捷工作流（/test、/pr-review、/explain）

本插件为**只读模式** -- 仅分析代码库结构，不会修改任何文件。

## 安装方法

### 通过插件市场安装

在 Claude Code 中运行：

```bash
/plugin install claude-code-setup@claude-plugins-official
```

### 手动安装

将本目录复制到插件目录或创建符号链接：

```bash
ln -s /path/to/claude-code-setup ~/.claude/plugins/local/claude-code-setup
```

## 使用说明

安装后，Claude Code 会自动识别并使用此技能。你可以通过以下自然语言指令触发：

```
"推荐适合这个项目的自动化方案"
"帮我配置 Claude Code"
"我应该使用哪些 Hooks？"
"分析我的代码库，看看需要哪些工具"
"set up Claude Code for this project"
"what hooks should I use?"
```

Claude 会自动分析项目结构、技术栈和代码组织方式，然后给出个性化的自动化推荐。

### 输出示例

```
已分析项目：my-project (TypeScript + React + Node.js)

推荐自动化方案：

MCP 服务器：
  - context7：用于查询最新 React 和 Node.js 文档
  - Playwright：用于端到端测试

Skills：
  - frontend-design：用于生成高质量 UI 组件

Hooks：
  - 提交前自动运行 Prettier 格式化
  - 阻止编辑敏感配置文件

斜杠命令：
  - /test：快速运行测试套件
  - /pr-review：生成 Pull Request 审查报告
```

## 注意事项

- 本插件仅执行**只读分析**，不会修改任何文件或配置
- 推荐结果基于代码库的实际结构和技术栈，不同项目会有不同建议
- 建议在接受推荐前，先了解每个自动化方案的作用
- 需要 Claude Code 支持 Skill 功能

## 作者

Isabella He (isabella@anthropic.com)
