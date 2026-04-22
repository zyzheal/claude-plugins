# LSP Plugins Bundle

## 概述
11 个语言服务器协议 (LSP) 插件集合，为 Claude Code 提供多语言的智能代码感知能力。

## 安装
每个 LSP 插件独立安装：

```bash
# 安装所有 LSP 插件
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
/plugin install gopls-lsp@claude-plugins-official
/plugin install clangd-lsp@claude-plugins-official
/plugin install rust-analyzer-lsp@claude-plugins-official
/plugin install jdtls-lsp@claude-plugins-official
/plugin install kotlin-lsp@claude-plugins-official
/plugin install csharp-lsp@claude-plugins-official
/plugin install swift-lsp@claude-plugins-official
/plugin install lua-lsp@claude-plugins-official
/plugin install php-lsp@claude-plugins-official
```

## 各 LSP 详情

| 插件 | 语言 | LSP 服务器 | 系统依赖 |
|------|------|------------|----------|
| typescript-lsp | TypeScript/JavaScript | typescript-language-server | `npm i -g typescript-language-server typescript` |
| pyright-lsp | Python | pyright | `pip install pyright` |
| gopls-lsp | Go | gopls | `go install golang.org/x/tools/gopls@latest` |
| clangd-lsp | C/C++ | clangd | `apt install clangd` 或 `brew install clangd` |
| rust-analyzer-lsp | Rust | rust-analyzer | `rustup component add rust-analyzer` |
| jdtls-lsp | Java | Eclipse JDT Language Server | 需下载 JDT LS 发行版 |
| kotlin-lsp | Kotlin | Kotlin Language Server | 需下载 KLS 发行版 |
| csharp-lsp | C# | OmniSharp | `dotnet tool install -g omnisharp` |
| swift-lsp | Swift | sourcekit-lsp | macOS + Xcode toolchain |
| lua-lsp | Lua | Lua Language Server | `npm i -g lua-language-server` |
| php-lsp | PHP | PHPactor | `composer require phpactor/phpactor` |

## 激活
安装后自动在对应语言的文件中启动。Claude Code 编辑文件时自动使用 LSP。

## 提供的能力
| 能力 | 说明 |
|------|------|
| 跳转定义 | 跳转到函数/类/变量的定义位置 |
| 查找引用 | 查找符号的所有引用 |
| 类型提示 | 悬停显示类型信息 |
| 代码补全 | 自动补全建议 |
| 错误诊断 | 实时语法和语义错误检查 |
| 符号重命名 | 安全重命名（更新所有引用） |
| 文档注释 | 函数文档快速查看 |

## 参数
无需手动参数，LSP 自动感知项目结构。

## 依赖
各语言对应的语言服务器（见上表"系统依赖"列）

## 配置示例
在 `settings.json` 的 `enabledPlugins` 中添加：
```json
{
  "enabledPlugins": {
    "typescript-lsp@claude-plugins-official": true,
    "pyright-lsp@claude-plugins-official": true
  }
}
```
