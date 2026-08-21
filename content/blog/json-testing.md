---
title: "JSON 测试数据与断言"
description: "JSON 用于测试夹具与 API 断言，本文介绍组织、Mock 与断言技巧。"
date: "2026-08-19"
category: "场景"
keywords: ["json测试","测试数据","json断言"]
---

# JSON 测试数据与断言

JSON 常用作测试夹具（fixture）与 API 断言数据，便于组织与维护。

## 夹具组织

按场景分 JSON 文件，测试时加载作为输入或期望输出。

## 断言

用 JSONPath 或深度比较断言响应，忽略可变字段（时间、ID）。

## 代码示例

```json
{"expected": {"status": "ok", "code": 0}}
```

## 推荐在线工具

- [/mock](/mock)
- [/diff](/diff)

## 小结

JSON 用于测试夹具与 API 断言，本文介绍组织、Mock 与断言技巧。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
