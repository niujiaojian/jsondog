---
title: "JSON 与 YAML 对比"
description: "YAML 比 JSON 更简洁，靠缩进表示层级，支持注释。配置文件常用 YAML，API 常用 JSON。"
date: "2026-08-19"
category: "基础"
keywords: ["json vs yaml","yaml转json","json转yaml"]
---

# JSON 与 YAML 对比

YAML 是 JSON 的超集，用缩进而非括号表示结构，更受配置文件青睐。

## 语法差异

YAML 用缩进表示层级，无需引号与逗号，支持注释与多行字符串；JSON 必须括号、引号、逗号。

## 使用建议

配置文件用 YAML 更易读，数据交换用 JSON 更通用。可用工具互转。

## 代码示例

```json
name: JSONDog
version: 0.1.0
tools:
  - format
  - validate
```

## 推荐在线工具

- [/format](/format)
- [/convert/yaml](/convert/yaml)

## 小结

YAML 比 JSON 更简洁，靠缩进表示层级，支持注释。配置文件常用 YAML，API 常用 JSON。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
