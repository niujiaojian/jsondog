---
title: "JSON Schema 入门指南"
description: "JSON Schema 是描述 JSON 结构的规范，用于验证数据是否符合预期格式。"
date: "2026-08-19"
category: "工具"
keywords: ["json schema","json schema生成","json验证"]
---

# JSON Schema 入门指南

JSON Schema 是一种用 JSON 描述 JSON 结构的规范，可校验数据是否符合预期的类型、格式、约束。

## 核心概念

type 指定类型、properties 定义对象属性、items 定义数组元素、required 必填字段。

## 使用场景

API 请求响应校验、配置文件验证、数据契约定义。

## 代码示例

```json
{"type": "object", "properties": {"name": {"type": "string"}}}
```

## 推荐在线工具

- [/schema](/schema)
- [/validate](/validate)

## 小结

JSON Schema 是描述 JSON 结构的规范，用于验证数据是否符合预期格式。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
