---
title: "JSON 缓存策略"
description: "JSON 响应可缓存于 CDN、Redis、本地，本文介绍缓存键设计与失效策略。"
date: "2026-08-19"
category: "场景"
keywords: ["json缓存","api缓存","redis json"]
---

# JSON 缓存策略

JSON 响应缓存可大幅提升性能，需合理设计缓存键与失效策略。

## 缓存层

CDN 缓存静态 JSON、Redis 缓存热点接口、浏览器缓存带 ETag。

## 失效策略

TTL 过期、版本号键、主动清除，注意一致性。

## 代码示例

```json
{"key": "user:1:profile", "ttl": 3600}
```

## 推荐在线工具

- [/minify](/minify)
- [/format](/format)

## 小结

JSON 响应可缓存于 CDN、Redis、本地，本文介绍缓存键设计与失效策略。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
