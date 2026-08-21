---
title: "JSON 与表单数据转换"
description: "前端表单常需与 JSON 互转，本文介绍序列化、嵌套表单与提交技巧。"
date: "2026-08-19"
category: "场景"
keywords: ["json表单","form json","表单序列化"]
---

# JSON 与表单数据转换

前端表单数据常需转为 JSON 提交 API，或将 JSON 回填表单，需处理嵌套与数组。

## 转换方式

FormData 遍历构建对象、name 用点路径表达嵌套、数组用 [] 后缀。

## 库推荐

qs、form-serialize、或框架内置（如 Vue v-model）。

## 代码示例

```json
{"user": {"name": "x", "tags": ["a", "b"]}}
```

## 推荐在线工具

- [/flatten](/flatten)
- [/format](/format)

## 小结

前端表单常需与 JSON 互转，本文介绍序列化、嵌套表单与提交技巧。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
