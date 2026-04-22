# 前端设计技能

生成独特、生产级的前端界面，告别千篇一律的 AI 审美风格。

## 功能简介

前端设计技能让 Claude Code 在处理前端任务时，能够创建具有独特美学和精心设计的用户界面。该技能指导 Claude：

- **大胆的美学选择** -- 拒绝平庸，每个界面都有明确的视觉方向
- **独特的配色和排版** -- 精心设计的调色板和字体层次
- **高影响力动效** -- 有意义的动画和视觉细节，提升用户体验
- **上下文感知实现** -- 根据项目类型和用途选择合适的设计风格

该技能专为避免"通用 AI 审美"而设计 -- 那种 bland、缺乏个性的输出风格。

## 安装方法

### 通过插件市场安装

```bash
/plugin install frontend-design@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/frontend-design ~/.claude/plugins/local/frontend-design
```

## 使用说明

安装完成后，Claude Code 在处理前端相关任务时会自动应用此技能。你只需要用自然语言描述需求即可：

```
"创建一个音乐流媒体应用的仪表盘"
"为 AI 安全公司设计一个着陆页"
"设计一个支持深色模式的设置面板"
"Build a landing page for a fintech startup"
"Create a responsive product card component"
"Design a data visualization dashboard with charts"
```

Claude 会选择明确的视觉设计方向，并实现生产级代码，对细节精益求精。

### 适用场景

| 场景 | 示例指令 |
|------|----------|
| **着陆页** | "为 SaaS 产品设计一个转化导向的着陆页" |
| **仪表盘** | "创建一个电商数据分析仪表盘" |
| **组件库** | "设计一套表单组件（输入框、选择器、日期选择）" |
| **移动端适配** | "将现有的桌面布局转换为移动端优先的响应式设计" |
| **深色模式** | "为现有界面添加深色模式支持" |
| **动画效果** | "为页面切换添加平滑的过渡动画" |

### 设计风格示例

Claude 会根据内容选择合适的美学方向，可能包括：

- **极简主义** -- 大量留白、精炼的排版
- **新粗野主义** -- 大胆的色彩碰撞、不规则布局
- **玻璃拟态** -- 半透明磨砂玻璃效果
- **复古终端** -- 等宽字体、绿色荧光风格
- **新拟态** -- 柔和的内阴影和外阴影
- 以及其他更多风格...

## 深入学习

想要了解如何更好地提示 Claude 生成高质量前端设计，请参考：

- [Frontend Aesthetics Cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb) -- 深入了解前端美学提示技巧

## 输出质量

此技能生成的代码具备以下特点：

- **生产就绪** -- 可直接部署的完整代码
- **响应式布局** -- 适配不同屏幕尺寸
- **无障碍访问** -- 遵循 a11y 最佳实践
- **性能优化** -- 避免不必要的渲染和样式计算
- **可维护** -- 结构清晰、注释完善

## 注意事项

- 该技能专注于**视觉设计质量**，不涉及后端逻辑
- 对于已有设计系统的项目，请在指令中说明使用现有组件库
- 生成的代码默认使用现代 CSS 特性（如 CSS Grid、自定义属性）
- 建议配合代码简化代理（code-simplifier）使用，进一步优化产出代码

## 作者

Prithvi Rajasekaran (prithvi@anthropic.com)
Alexander Bricken (alexander@anthropic.com)
