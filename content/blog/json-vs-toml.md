---
title: "JSON 与 TOML 对比"
description: "TOML 是语义明确的配置格式，比 JSON 更适合配置文件，支持注释与类型。"
date: "2026-08-19"
category: "基础"
keywords: ["json vs toml","toml","配置格式"]
---

# JSON 与 TOML 对比

TOML 旨在成为更好的配置文件格式，语义明确，支持注释与丰富类型。

## TOML 优势

强类型、支持注释、日期时间类型、表结构清晰，适合复杂配置。

## 与 JSON 关系

TOML 可转 JSON，但 JSON 不支持注释，转回会丢失。

## 代码示例

```json
[server]
port = 8080
host = "localhost"
```

## 推荐在线工具

- [/format](/format)
- [/convert/toml](/convert/toml)

## 小结

TOML 是语义明确的配置格式，比 JSON 更适合配置文件，支持注释与类型。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
