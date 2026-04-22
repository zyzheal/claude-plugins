# rust-analyzer-lsp（Rust 语言服务器）

为 Claude Code 提供 Rust 语言智能分析和代码能力的 LSP 插件。支持代码补全、跳转定义、悬停信息、诊断等功能。

## 支持的文件类型

`.rs`

## 安装

### 插件安装

```bash
/plugin install rust-analyzer-lsp@claude-plugins-official
```

### 安装 rust-analyzer（必需）

```bash
# 通过 rustup 安装（推荐）
rustup component add rust-analyzer

# 通过 Homebrew 安装（macOS）
brew install rust-analyzer

# 通过包管理器安装（Linux）
# Ubuntu/Debian
sudo apt install rust-analyzer

# Arch Linux
sudo pacman -S rust-analyzer

# 或从 GitHub 下载预编译二进制文件
# https://github.com/rust-lang/rust-analyzer/releases
```

## 功能特性

- ✅ **代码补全**：智能代码建议和自动补全
- ✅ **跳转定义**：快速导航到函数、类型、变量的定义
- ✅ **悬停信息**：鼠标悬停显示类型签名和文档
- ✅ **诊断检查**：实时错误、警告提示
- ✅ **重命名重构**：安全地重命名符号
- ✅ **查找引用**：查找符号的所有使用位置
- ✅ **符号搜索**：按名称搜索工作区符号

## 工作原理

1. Claude Code 检测到 `.rs` 文件
2. rust-analyzer-lsp 插件激活
3. 通过 stdio 连接到 rust-analyzer 语言服务器
4. 提供代码智能功能：跳转定义、悬停信息、诊断、补全、重命名

## 配置

rust-analyzer 会自动从系统 PATH 中查找。确保 `rust-analyzer` 命令可用：

```bash
# 验证安装
rust-analyzer --version
```

## 常见问题

### rust-analyzer 找不到

确保已通过 `rustup component add rust-analyzer` 或其他方式安装。

### 代码补全不工作

- 确保 Cargo.toml 存在且项目能正常编译
- 运行 `cargo check` 确保没有编译错误

### 性能问题

对于大型项目，rust-analyzer 首次索引可能需要一些时间，后续会显著加快。

## 相关资源

- [rust-analyzer 官网](https://rust-analyzer.github.io/)
- [GitHub 仓库](https://github.com/rust-lang/rust-analyzer)

## License

MIT License
