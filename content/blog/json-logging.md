---
title: "JSON 日志格式最佳实践"
description: "结构化 JSON 日志便于机器检索分析，本文介绍字段设计与采集。"
date: "2026-08-19"
category: "场景"
keywords: ["json日志","结构化日志","json log"]
---

# JSON 日志格式最佳实践

结构化 JSON 日志便于 ELK、Loki 等系统检索分析，优于纯文本日志。

## 字段设计

time、level、msg、service、traceId 等标准字段，业务字段扁平化。

## 采集

每行一条 JSON（NDJSON），便于流式采集与解析。

## 代码示例

```json
{"time":"2026-08-19T10:00:00Z","level":"info","msg":"started"}
```

## 推荐在线工具

- [/format](/format)
- [/minify](/minify)

## 小结

结构化 JSON 日志便于机器检索分析，本文介绍字段设计与采集。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
