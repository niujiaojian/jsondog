---
title: "JSON:API 规范指南"
description: "JSON:API 是 RESTful API 的数据响应规范，统一资源、关系、分页、错误格式。"
date: "2026-08-19"
category: "进阶"
keywords: ["json:api","json api规范","restful"]
---

# JSON:API 规范指南

JSON:API 是一套构建 RESTful API 数据响应的规范，统一了资源对象、关系、分页与错误的 JSON 结构。

## 核心约定

data 包含资源数组或单对象，relationships 描述关联，included 包含关联资源，meta 存元信息。

## 优势

统一格式减少约定成本，客户端可通用化处理。

## 代码示例

```json
{"data": [{"type": "user", "id": "1", "attributes": {"name": "x"}}]}
```

## 推荐在线工具

- [/format](/format)
- [/validate](/validate)

## 小结

JSON:API 是 RESTful API 的数据响应规范，统一资源、关系、分页、错误格式。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
