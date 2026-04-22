# cli-anything（CLI 生成器）

为任何 GUI 应用程序构建功能强大的有状态命令行界面（CLI）。基于经过验证的 cli-anything 方法论，已成功为 GIMP、Blender、Inkscape、Audacity、LibreOffice、OBS Studio 和 Kdenlive 生成 CLI，累计超过 1,245 个通过测试。

## 功能特性

- ✅ 自动分析应用架构和数据模型
- ✅ 设计镜像 GUI 功能的 CLI 结构
- ✅ 实现核心模块和状态管理
- ✅ 全面的单元测试和 E2E 测试
- ✅ 自动生成 SKILL.md 供 AI Agent 发现
- ✅ PyPI 打包和分发支持
- ✅ REPL 模式、JSON 输出、撤销/重做

## 安装

```bash
/plugin install cli-anything@claude-plugins-official
```

### 手动安装

```bash
ln -s /path/to/cli-anything ~/.claude/plugins/local/cli-anything
```

### 前置要求

- Python 3.10+
- `click` - CLI 框架
- `pytest` - 测试框架

```bash
pip install click pytest
```

## 命令

### `/cli-anything <软件路径或仓库>`

为任意软件构建完整的 CLI 工具。接受本地源码路径或 GitHub 仓库 URL。

**示例：**

```bash
# 从本地源码构建
/cli-anything /home/user/gimp

# 从 GitHub 仓库构建
/cli-anything https://github.com/blender/blender
```

执行所有阶段：源码获取 → 代码分析 → CLI 架构设计 → 实现 → 测试 → 文档 → SKILL.md 生成 → PyPI 发布

### `/cli-anything:refine <软件路径> [焦点]`

扩展现有 CLI 的功能覆盖范围，分析差距并迭代添加新命令和测试。

**示例：**

```bash
# 广泛扩展 - Agent 自动查找所有差距
/cli-anything:refine /home/user/gimp

# 聚焦扩展 - 针对特定功能区域
/cli-anything:refine /home/user/blender "粒子系统和物理模拟"
```

### `/cli-anything:test <软件路径或仓库>`

运行 CLI 测试并更新 TEST.md 结果。

```bash
/cli-anything:test /home/user/gimp
```

### `/cli-anything:validate <软件路径或仓库>`

验证 CLI 是否符合 HARNESS.md 标准和最佳实践。

```bash
/cli-anything:validate /home/user/gimp
```

### `/cli-anything:list [--path <目录>] [--depth <n>] [--json]`

列出所有可用的 CLI-Anything 工具。

```bash
# 列出当前目录的所有工具
/cli-anything:list

# 限制扫描深度
/cli-anything:list --depth 2

# JSON 格式输出
/cli-anything:list --json
```

## 构建流程

### 阶段 1：代码分析

分析目标应用：
- 后端引擎（如 MLT、GEGL、bpy）
- 数据模型（XML、JSON、二进制）
- 现有 CLI 工具
- GUI 到 API 的映射

**产出：** 软件专用的 SOP 文档

### 阶段 2：CLI 架构设计

设计 CLI 结构：
- 与应用领域对应的命令组
- 状态模型（JSON 项目格式）
- 输出格式（人类可读 + JSON）
- 渲染管道

### 阶段 3：实现

构建 CLI：
- 核心模块（项目、会话、导出等）
- Click CLI 带命令组
- REPL 模式（默认行为）
- `--json` 机器可读输出
- 全局会话状态 + 撤销/重做（50 级栈）

### 阶段 4-5：测试

- 单元测试（合成数据）
- E2E 测试（真实文件）
- 工作流测试（多步骤场景）
- 输出验证（像素分析、格式验证）

### 阶段 6.5：SKILL.md 生成

自动生成 AI 可发现的技能定义，包含 YAML frontmatter、命令组、示例和 Agent 指导。

### 阶段 7：PyPI 发布

使用 PEP 420 命名空间包打包，支持多个 CLI 共存而不冲突。

## 成功案例

| 软件 | 测试数 | 描述 |
|------|--------|------|
| GIMP | 103 | 位图图像编辑器 |
| Blender | 200 | 3D 创作套件 |
| Inkscape | 197 | 矢量图形编辑器 |
| Audacity | 154 | 音频编辑器 |
| LibreOffice | 143 | 办公套件 |
| OBS Studio | 153 | 流媒体/录制 |
| Kdenlive | 151 | 视频编辑器 |
| Shotcut | 144 | 视频编辑器 |
| **总计** | **1,245** | 全部通过 |

## 核心特性

### 有状态会话管理
- 撤销/重做（深拷贝快照，50 级栈）
- 项目状态持久化
- 历史记录跟踪

### 双输出模式
- 人类可读（表格、颜色）
- 机器可读（`--json` 标志）

### REPL 模式
- 无子命令时默认进入
- 统一 ReplSkin 带品牌横幅和彩色提示
- 持久化命令历史

## 何时使用

✅ **适合：**
- 具有清晰数据模型的 GUI 应用
- 有现有 CLI 工具或 API 的应用
- 需要 Agent 可用界面的项目
- 自动化和脚本工作流

❌ **不适合：**
- 纯二进制、未文档化格式的应用
- 实时交互式应用
- 需要 GPU/显示访问的应用

## 发布和分发

### 本地安装

```bash
cd /root/cli-anything/<software>/agent-harness
pip install -e .
cli-anything-<software> --help
```

### 发布到 PyPI

```bash
pip install build twine
python -m build
twine upload dist/*
```

### 用户安装

```bash
pip install cli-anything-<software>
cli-anything-<software> --help
```

## License

MIT License
