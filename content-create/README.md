# Content-Create Plugin

智能内容创作工作流插件，支持从热点收集到多平台发布的一站式自动化流程。

## 功能特性

- 🔥 **热点收集**: 自动从 RSS 源和 Web 搜索收集最新热点资讯
- ✍️ **智能撰写**: AI 驱动的公众号、小红书内容创作，支持风格模仿
- 📝 **质量评审**: 自动评审文章质量，模拟用户反馈，循环优化
- 🚀 **多平台发布**: 支持微信公众号、小红书、飞书等平台一键发布
- 📊 **数据分析**: 内容创作数据分析与可视化
- ⚙️ **灵活配置**: 简洁的配置管理，支持自定义工作流

## 快速开始

### 安装

使用插件市场安装
进入 Claude Code 命令行，执行以下命令：
```bash
/plugins marketplace add https://github.com/xyzbit/claude-plugins.git
/plugins install content-create
```
### 配置

#### 交互式配置向导

在 Claude Code 命令行中执行以下命令：
```bash
/content-create:config
```

![图片](./content-create-config.png) 

#### 手动配置

**配置文件**
在您的项目根目录创建配置文件 `.claude/content-create.local.md`：

```bash
mkdir -p .claude
cp ~/.claude/plugins/content-create/templates/content-create.local.md .claude/
```

编辑配置文件，添加您的 RSS 源和 API 密钥、平台配置。

API 密钥可以直接修改到 mcp.json 文件中，也可以通过**环境变量配置**：

```bash
export MINIMAX_API_KEY="your-minimax-api-key"
export MINIMAX_API_HOST="https://api.minimaxi.com"
export WECHAT_APP_ID="your-wechat-app-id"
export WECHAT_APP_SECRET="your-wechat-app-secret"
export LARK_APP_ID="your-lark-app-id"
export LARK_APP_SECRET="your-lark-app-secret"
```

## 使用方法

### 命令

#### `/content-create:write` - 内容创作工作流

执行完整的内容创作工作流：数据收集 → 撰写 → 评审 → 发布

**基础用法**：
```
/content-create:write "AI手机热点分析"
```

**高级用法**：
```
/content-create:write "DeepSeek V3评测" platforms:wx
/content-create:write "AI编程工具对比" platforms:wx,xhs
/content-create:write "快速文章" skip-review:true
```

**参数说明**：
- `topic` (必填) - 创作主题或关键词
- `platforms` (可选) - 发布平台，可选 wx（公众号）、xhs（小红书）、feishu（飞书），默认：wx,xhs
- `skip-review` (可选) - 跳过评审环节，默认：false
- `workspace` (可选) - 自定义工作空间路径

#### `/content-create:analysis` - 数据分析

分析内容创作相关数据并生成可视化报告

**用法**：
```
/content-create:analysis article/2025-12-08/metrics.csv
/content-create:analysis data/wx_stats.json analysis-type:trend
```

**参数说明**：
- `data-path` (必填) - 数据文件路径（支持 CSV/Excel/JSON）
- `analysis-type` (可选) - 分析类型：performance（性能分析）、trend（趋势分析）、comparison（对比分析）
- `output-path` (可选) - 报告输出路径

#### `/content-create:config` - 配置管理

查看和管理插件配置

**用法**：
```
/content-create:config                           # 显示当前配置
/content-create:config action:edit section:rss   # 编辑 RSS 源配置
/content-create:config action:reset              # 重置为默认配置
```

### Agents

插件提供5个专业的内容创作 Agent，可以独立调用：

- **collector**: 热点信息收集专家
- **writer-wx**: 公众号内容撰写专家
- **writer-xhs**: 小红书内容改写专家
- **reviewer**: 文章质量评审专家
- **data-analyst**: 数据分析与可视化专家

Agent 会根据任务自动触发，也可以在对话中明确请求使用。

### Skills

插件包含2个知识技能，会根据上下文自动激活：

- **content-workflow**: 内容创作工作流最佳实践
- **platform-publishing**: 多平台发布指南

## 工作流程

完整的内容创作工作流包含以下步骤：

1. **初始化工作空间**
   - 生成时间戳目录 `article/YYYY-MM-DD-HH-MM/`
   - 读取配置文件

2. **数据收集** (collector agent)
   - 从 RSS 源获取最新文章
   - Web 搜索补充热点信息
   - 生成 `hot_topic_data.md`

3. **文章撰写** (writer-wx agent)
   - 分析风格参考文章
   - 基于热点数据创作公众号文章
   - 生成封面图和配图
   - 输出 `wx_article.md`

4. **质量评审** (reviewer agent)
   - 风险合规检查
   - 内容质量评分（0-100）
   - 模拟用户评论
   - 如评分 < 85，提供修改建议并重新撰写（最多2次）

5. **公众号发布** (wenyan-mcp)
   - 使用微信公众号 API 发布文章
   - 支持主题模板

6. **小红书改写** (writer-xhs agent，如启用)
   - 改写为小红书爆款风格
   - 短句 + Emoji 排版
   - 输出 `xhs_article.md`

7. **小红书发布** (playwright，如启用)
   - 自动化发布到小红书创作平台
   - 保存到草稿箱

8. **生成总结报告**
   - 工作流执行总结
   - 生成的文件列表
   - 发布状态

## 配置详解

### RSS 源配置

在 `.claude/content-create.local.md` 中配置：

```yaml
rss_sources:
  - name: "AI产品洞察日报"
    url: "https://justlovemaki.github.io/CloudFlare-AI-Insight-Daily/rss.xml"
  - name: "AI产品创业者-刘小排"
    url: "https://wechat2rss.bestblogs.dev/feed/xxx.xml"
```

### 时间范围

控制热点数据收集的时间范围：

```yaml
time_range: "7天"  # 可选：24小时、48小时、7天、30天
```

### 路径配置

自定义工作空间和风格参考路径：

```yaml
paths:
  workspace_root: "article"
  style_references: "article/style_references"
```

### 平台配置

控制发布行为：

```yaml
platforms:
  wx:
    enabled: true # 是否开启, 开启后才会写公号文章
    auto_publish: false # 是否自动发布, 开启后会自动发布到公众号草稿箱
  xhs:
    enabled: true # 是否开启, 开启后才会写小红书文章
    auto_publish: false # 是否自动发布, 开启后会自动发布到小红书
  feishu:
    enabled: true
    auto_publish: false # 是否自动发布, 开启后会自动发布到飞书群
    chat_id: "${chat_id}" # 飞书群聊 ID
```

### API 密钥

使用环境变量引用（不要在配置文件中硬编码）：

```yaml
api_keys:
  minimax_api_key: "${MINIMAX_API_KEY}"
  wechat_app_id: "${WECHAT_APP_ID}"
  wechat_app_secret: "${WECHAT_APP_SECRET}"
```

## MCP 服务器

插件集成了6个 MCP 服务器：

| MCP Server | 功能 | 必需 |
|-----------|------|------|
| rss-reader-server | RSS 源读取 | ✅ |
| minimax-mcp | AI 图片/视频生成 | ✅ |
| wenyan-mcp | 微信公众号发布 | 可选 |
| playwright | 小红书自动化发布 | 可选 |
| redbook-search-comment-mcp | 小红书数据搜索 | 可选 |
| lark-mcp | 飞书发布 | 可选 |

**环境变量配置**：
- `MINIMAX_API_KEY`: Minimax API 密钥
- `MINIMAX_API_HOST`: Minimax API 地址（默认：https://api.minimaxi.com）
- `WECHAT_APP_ID`: 微信公众号 App ID
- `WECHAT_APP_SECRET`: 微信公众号 App Secret
- `LARK_APP_ID`: 飞书应用 ID
- `LARK_APP_SECRET`: 飞书应用 Secret

## 目录结构

```
project-root/
├── .claude/
│   └── content-create.local.md        # 用户配置（不提交到 git）
│
└── article/                           # 工作空间
    ├── style_references/              # 风格参考（用户提供）
    │   ├── article/                   # 文章风格参考
    │   │   ├── 示例文章1.md
    │   │   ├── 示例文章2.md
    │   │   └── 示例文章3.md
    │   └── report/                    # 报告风格参考
    │       ├── wx_report.md
    │       └── xhs_report.md
    │
    └── 2025-12-08-16-30/              # 工作空间（自动生成）
        ├── hot_topic_data.md          # 热点数据
        ├── hot_topic_report.md        # 热点报告
        ├── wx_article.md              # 公众号文章
        ├── xhs_article.md             # 小红书文章
        ├── review_report.md           # 评审报告
        └── workflow_summary.md        # 工作流总结
```

## 最佳实践

1. **风格参考文章**
   - 准备 2-3 篇您希望模仿的文章作为风格参考
   - 文章应具有一致的风格和调性
   - 放置在 `article/style_references/article/` 目录

2. **RSS 源选择**
   - 选择高质量、更新频繁的 RSS 源
   - 根据您的内容领域选择相关源
   - 定期更新和维护 RSS 源列表

3. **评审优化**
   - 首次使用建议不跳过评审环节
   - 根据评审反馈持续优化写作质量
   - 积累高分文章作为风格参考

4. **发布策略**
   - 建议 `auto_publish: false`，先预览再发布
   - 检查图片生成质量
   - 根据平台特点调整内容

5. **安全性**
   - 不要在配置文件中硬编码 API 密钥
   - 使用环境变量管理敏感信息
   - 将 `.claude/*.local.md` 添加到 .gitignore

## 故障排查

### 命令无法识别

**问题**: `/content-create:write` 命令不可用

**解决方案**:
1. 确认插件已安装在正确位置
2. 重启 Claude Code
3. 检查 `plugin.json` 格式是否正确

### MCP 服务器连接失败

**问题**: RSS 读取或图片生成失败

**解决方案**:
1. 检查环境变量是否正确配置
2. 验证 API 密钥有效性
3. 确认网络连接正常
4. 检查 MCP 服务器是否正确安装（npx/uvx）

### 文章质量评分低

**问题**: 文章总是无法通过评审

**解决方案**:
1. 检查风格参考文章质量
2. 确保热点数据充足
3. 调整评审标准（如需要）
4. 使用 `skip-review:true` 跳过评审（测试用）

### 发布失败

**问题**: 无法发布到公众号或小红书

**解决方案**:
1. 验证平台 API 凭证
2. 检查平台账号权限
3. 确认内容符合平台规范
4. 查看详细错误日志

## 贡献

欢迎提交 Issue 和 Pull Request！

---

## 🔄 工作流程详解

### 完整流程

```
/content-create:write <topic>
        ↓
Step 1: 初始化工作空间 → article/YYYY-MM-DD-HH-MM/
        ↓
Step 2: collector agent → hot_topic_data.md
        ↓
Step 3: writer-wx/xhs agent → wx_article.md / xhs_article.md
        ↓
Step 4: reviewer agent → review_report.md (评分<85 则重新撰写)
        ↓
Step 5: 多平台发布 → 公众号/小红书/飞书
        ↓
Step 6: workflow_summary.md
```

### 自动触发的 Agent

| 步骤 | Agent | 说明 |
|------|-------|------|
| Step 2 | collector | 热点信息收集（RSS + Web 搜索） |
| Step 3 | writer-wx | 公众号文章撰写 |
| Step 3 | writer-xhs | 小红书文章改写 |
| Step 4 | reviewer | 文章质量评审（可跳过） |

详细工作流程请查看 [WORKFLOW.md](../WORKFLOW.md#4-content-create---智能内容创作)

---

## 📚 相关文档

- [使用指南](../USAGE.md) - 插件选择、功能对比、参数说明
- [工作流程](../WORKFLOW.md) - 详细工作流程、产出物规范

## 许可证

MIT License

## 更新日志

### v1.0.0 (2025-12-08)
- 初始版本发布
- 支持完整内容创作工作流
- 集成微信公众号、小红书、飞书平台
- 数据分析功能
- 配置管理命令

### v1.1.0 (doing)
- 支持按平台配置参考文章
- 支持通过平台API或操作浏览器的方式自动生成数据分析报告