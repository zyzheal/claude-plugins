# CLI-Anything Plugin

## 概述
将任何 GUI 应用程序转换为 AI agent 可操作的状态化 CLI 接口的框架和方法论。

## 安装
```
/plugin install cli-anything@cli-anything
```

## 激活
通过 marketplace 安装后自动注册。

## 使用方法
CLI-Anything 提供了一套 SOP（标准操作程序）将 GUI 应用转换为 CLI：

### Phase 1: 代码库分析
1. 识别后端引擎（GUI 与逻辑分离的部分）
2. 映射 GUI 动作到 API 调用
3. 识别数据模型（文件格式、状态表示）
4. 查找现有 CLI 工具
5. 编目命令/撤销系统

### Phase 2: CLI 架构设计
1. 选择交互模型（有状态 REPL / 子命令 CLI / 两者）
2. 定义命令组（项目管理、核心操作、导入导出、配置）
3. 设计状态模型（持久化、存储、序列化）
4. 规划输出格式（人类可读 / 机器可读）

### Phase 3: 实现
按照设计实现 CLI 接口

## 参数
| 参数 | 说明 |
|------|------|
| 目标应用 | 要转换的 GUI 应用程序 |
| 交互模式 | REPL / CLI / 两者 |

## 依赖
- 目标 GUI 应用的源代码
- Claude Code agent 系统

## 已支持的 Skill
CLI-Anything hub 包含 50+ 预构建 skill，覆盖：
- 视频编辑：Shotcut, Kdenlive, Blender, OBS, Audacity
- 图像处理：GIMP, Krita, Inkscape, Draw.io
- 办公套件：LibreOffice
- 开发工具：PM2, Ollama, ChromaDB, Godot
- 浏览器：Browser 自动化
- 文档：Zotero, NotebookLM, Mubu
- 及其他...

## 示例
```
为 Shotcut 创建 CLI 接口
把 GIMP 转成 agent 可用的 CLI
为我的应用构建一个 stateful CLI
```
