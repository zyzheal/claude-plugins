# pr-review-toolkit（PR 审查工具集）

包含 6 个专业审查 Agent 的集合，全面覆盖代码注释准确性、测试覆盖率、错误处理、类型设计、代码质量和代码简化等维度。

## 内置 Agent

### 1. comment-analyzer（注释分析器）
**专注：** 代码注释的准确性和可维护性

**分析内容：**
- 注释与代码的一致性
- 文档完整性
- 注释腐化和技术债
- 误导性或过时的注释

**触发词：**
```
"检查注释是否准确"
"审查我添加的文档"
"分析注释的技术债"
```

### 2. pr-test-analyzer（测试分析器）
**专注：** 测试覆盖质量和完整性

**分析内容：**
- 行为覆盖 vs 行覆盖
- 关键测试缺口
- 测试质量和鲁棒性
- 边界情况和错误条件

**触发词：**
```
"检查测试是否充分"
"审查此 PR 的测试覆盖"
"有关键的测试缺口吗？"
```

### 3. silent-failure-hunter（静默失败猎手）
**专注：** 错误处理和静默失败

**分析内容：**
- catch 块中的静默失败
- 不充分的错误处理
- 不适当的回退行为
- 缺少错误日志

**触发词：**
```
"审查错误处理"
"检查静默失败"
"分析此 PR 的 catch 块"
```

### 4. type-design-analyzer（类型设计分析器）
**专注：** 类型设计质量和不变性

**分析内容：**
- 类型封装度（1-10 分）
- 不变性表达（1-10 分）
- 类型实用性（1-10 分）
- 不变性强制力（1-10 分）

**触发词：**
```
"审查 UserAccount 类型设计"
"分析此 PR 的类型设计"
"检查此类型是否有强的不变性"
```

### 5. code-reviewer（代码审查器）
**专注：** 通用代码审查和项目规范合规

**分析内容：**
- CLAUDE.md 合规性
- 风格违规
- Bug 检测
- 代码质量问题

**触发词：**
```
"审查我的最近变更"
"检查一切是否正常"
"提交前审查代码"
```

### 6. code-simplifier（代码简化器）
**专注：** 代码简化和重构

**分析内容：**
- 代码清晰度和可读性
- 不必要的复杂性和嵌套
- 冗余代码和抽象
- 与项目标准的一致性
- 过于紧凑或"聪明"的代码

**触发词：**
```
"简化这段代码"
"让它更清晰"
"优化这个实现"
```

## 使用模式

### 单个 Agent 使用

只需提出与 Agent 专注领域匹配的问题，Claude 会自动触发对应的 Agent：

```
"能检查测试是否覆盖了所有边界情况吗？"
→ 触发 pr-test-analyzer

"审查 API 客户端的错误处理"
→ 触发 silent-failure-hunter

"我添加了文档——准确吗？"
→ 触发 comment-analyzer
```

### 全面 PR 审查

对于彻底的 PR 审查，可以请求多个维度：

```
"我准备创建这个 PR，请：
1. 审查测试覆盖
2. 检查静默失败
3. 验证注释准确性
4. 审查所有新类型
5. 通用代码审查"
```

这将触发所有相关 Agent 分析 PR 的不同方面。

## 推荐工作流

```
1. 编写代码 → code-reviewer
2. 修复问题 → silent-failure-hunter（如涉及错误处理）
3. 添加测试 → pr-test-analyzer
4. 编写文档 → comment-analyzer
5. 添加类型 → type-design-analyzer
6. 审查通过 → code-simplifier（打磨）
7. 创建 PR
```

## 安装

```bash
/plugin install pr-review-toolkit@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/pr-review-toolkit ~/.claude/plugins/local/pr-review-toolkit
```

## 评分系统

| Agent | 评分方式 |
|-------|----------|
| comment-analyzer | 高置信度准确性检查 |
| pr-test-analyzer | 测试缺口 1-10 分（10 = 关键） |
| silent-failure-hunter | 错误处理问题严重度 |
| type-design-analyzer | 4 维度各 1-10 分 |
| code-reviewer | 问题 0-100 分（91-100 = 关键） |
| code-simplifier | 复杂度识别和建议 |

## 前置要求

- Git 仓库
- CLAUDE.md 文件（可选，用于规范检查）

## License

MIT License
