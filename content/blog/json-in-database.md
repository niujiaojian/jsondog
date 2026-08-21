---
title: "JSON 在数据库中的应用"
description: "PostgreSQL、MySQL、MongoDB 等支持 JSON 类型，可灵活存储半结构化数据。"
date: "2026-08-19"
category: "场景"
keywords: ["json数据库","jsonb","json列"]
---

# JSON 在数据库中的应用

现代关系数据库支持 JSON 类型字段，可灵活存储半结构化数据并查询。

## 各库支持

PostgreSQL 的 jsonb 可索引查询、MySQL 的 JSON 类型、MongoDB 原生 BSON。

## 使用建议

频繁查询的字段提为列，JSON 存可变部分；注意索引与性能。

## 代码示例

```json
{"profile": {"name": "x", "prefs": {"theme": "dark"}}}
```

## 推荐在线工具

- [/format](/format)
- [/validate](/validate)

## 小结

PostgreSQL、MySQL、MongoDB 等支持 JSON 类型，可灵活存储半结构化数据。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
