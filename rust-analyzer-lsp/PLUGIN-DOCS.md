# Rust Analyzer LSP Plugin

## 概述
Rust 语言服务器集成，为 Claude Code 提供 Rust 代码的智能感知、跳转定义、类型提示等功能。

## 安装
```
/plugin install rust-analyzer-lsp@claude-plugins-official
```

## 激活
安装后自动在 Rust 项目中启动。

## 使用方法
Claude Code 在编辑 Rust 文件时自动使用 LSP 提供：
- 跳转定义
- 查找引用
- 类型提示
- 代码补全
- 错误诊断

## 参数
无需手动参数。

## 依赖
- `rust-analyzer` 已安装并在 PATH 中
- Rust 项目（包含 Cargo.toml）

## 示例
（自动触发，在 .rs 文件中编辑时生效）
