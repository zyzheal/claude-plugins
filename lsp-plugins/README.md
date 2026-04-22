# lsp-plugins（LSP 语言服务器合集）

包含 11 种语言服务器协议（LSP）集成插件的集合，为 Claude Code 提供多语言的代码智能支持，包括跳转定义、悬停信息、诊断、代码补全等功能。

## 包含的插件

| 插件 | 语言 | LSP 服务器 | 安装命令 |
|------|------|------------|----------|
| clangd-lsp | C/C++ | clangd | `/plugin install clangd-lsp@claude-plugins-official` |
| csharp-lsp | C# | OmniSharp | `/plugin install csharp-lsp@claude-plugins-official` |
| gopls-lsp | Go | gopls | `/plugin install gopls-lsp@claude-plugins-official` |
| jdtls-lsp | Java | Eclipse JDT | `/plugin install jdtls-lsp@claude-plugins-official` |
| kotlin-lsp | Kotlin | kotlin-language-server | `/plugin install kotlin-lsp@claude-plugins-official` |
| lua-lsp | Lua | lua-language-server | `/plugin install lua-lsp@claude-plugins-official` |
| php-lsp | PHP | phpactor | `/plugin install php-lsp@claude-plugins-official` |
| pyright-lsp | Python | pyright | `/plugin install pyright-lsp@claude-plugins-official` |
| ruby-lsp | Ruby | ruby-lsp | `/plugin install ruby-lsp@claude-plugins-official` |
| swift-lsp | Swift | sourcekit-lsp | `/plugin install swift-lsp@claude-plugins-official` |
| typescript-lsp | TypeScript/JS | typescript-language-server | `/plugin install typescript-lsp@claude-plugins-official` |

## 安装

### 按需安装单个语言服务器

```bash
/plugin install pyright-lsp@claude-plugins-official
/plugin install typescript-lsp@claude-plugins-official
```

### 一次性安装全部

```bash
for lang in clangd csharp gopls jdtls kotlin lua php pyright ruby swift typescript; do
  /plugin install ${lang}-lsp@claude-plugins-official
done
```

## 前置要求

每种语言服务器需要单独安装对应的语言服务器工具：

```bash
# Python
pip install pyright

# TypeScript/JavaScript
npm install -g typescript-language-server typescript

# Go
go install golang.org/x/tools/gopls@latest

# C/C++
# macOS
brew install llvm
# Linux
sudo apt install clangd

# Java (Eclipse JDTLS)
# 需要 JDK 17+

# Ruby
gem install ruby-lsp
```

## 功能特性

所有 LSP 插件统一提供以下功能：

- ✅ **跳转定义** - 快速导航到符号定义位置
- ✅ **悬停信息** - 显示类型签名、文档注释
- ✅ **诊断检查** - 实时错误、警告、建议
- ✅ **代码补全** - 智能代码建议
- ✅ **重命名** - 安全地重命名符号
- ✅ **查找引用** - 查找符号的所有使用位置
- ✅ **符号搜索** - 按名称搜索工作区符号

## 工作原理

1. Claude Code 检测文件类型（如 `.py`、`.ts`、`.rs`）
2. 匹配的 LSP 插件自动激活
3. 通过 stdio 连接到对应的语言服务器
4. 提供代码智能功能

## 配置

每个 LSP 插件从系统 PATH 中查找对应的语言服务器。确保语言服务器命令可用：

```bash
# 验证安装
pyright --version
gopls version
typescript-language-server --version
```

## 常见问题

### 语言服务器找不到

确保对应的语言服务器已安装并且在 PATH 中可用。

### LSP 没有激活

- 确认文件扩展名匹配
- 确认语言服务器能正常启动
- 检查是否有语法错误阻止服务器启动

### 性能问题

大型项目首次索引可能需要一些时间，后续会显著加快。

## License

MIT License
