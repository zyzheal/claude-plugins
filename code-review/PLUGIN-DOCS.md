# Code Review Plugin

## 概述
自动化代码审查插件，使用 5 个并行专业 agent 对 PR 进行多维度审查，并通过置信度评分过滤误报。

## 安装
已通过 marketplace 安装：
```
/plugin install code-review@claude-plugins-official
```

## 激活
当对 PR 进行评论或请求审查时自动触发。

## 使用方法
**触发方式：**
- 在 Claude Code 中请求审查某个 PR
- 指定 PR 编号进行审查

**审查流程：**
1. 检查 PR 状态（是否关闭、草稿、已有审查）
2. 读取相关 CLAUDE.md 文件
3. 获取 PR 变更摘要
4. 启动 5 个并行 Sonnet agent：
   - Agent 1: CLAUDE.md 规范检查
   - Agent 2: 明显 bug 扫描
   - Agent 3: Git blame 历史分析
   - Agent 4: 历史 PR 评论对比
   - Agent 5: 代码注释一致性检查
5. 对每个问题启动置信度评分 (0-100)
6. 过滤置信度 < 80 的问题
7. 在 PR 上发布审查结果

## 参数
无需手动参数，自动读取 PR 信息。

## 依赖
- `gh` CLI 工具（GitHub CLI）
- Claude Code 的 agent 系统

## 示例
```
# 审查当前分支的 PR
/code-review

# 审查指定 PR
/code-review #123
```
