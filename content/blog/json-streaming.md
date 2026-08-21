---
title: "JSON 流式处理"
description: "流式 JSON 解析（NDJSON、SAX）适合大文件与实时数据，避免一次性加载。"
date: "2026-08-19"
category: "进阶"
keywords: ["json流式","ndjson","jsonl"]
---

# JSON 流式处理

流式 JSON 处理适合大文件与实时数据流，避免一次性加载到内存。

## NDJSON

每行一个独立 JSON 对象（JSON Lines），可逐行解析，适合日志与流数据。

## SAX 解析

事件驱动解析，边读边处理，内存占用恒定，适合超大 JSON。

## 代码示例

```json
{"id":1}
{"id":2}
{"id":3}
```

## 推荐在线工具

- [/format](/format)
- [/validate](/validate)

## 小结

流式 JSON 解析（NDJSON、SAX）适合大文件与实时数据，避免一次性加载。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
