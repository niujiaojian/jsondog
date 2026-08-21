---
title: "JSON 序列化原理与库"
description: "JSON 序列化将对象转为 JSON 字符串，各语言有成熟库，本文介绍原理与选型。"
date: "2026-08-19"
category: "进阶"
keywords: ["json序列化","json stringify","序列化库"]
---

# JSON 序列化原理与库

JSON 序列化指将内存对象转为 JSON 字符串，反序列化则相反，各语言均有成熟库支持。

## 主流库

JavaScript 内置 JSON、Java 用 Jackson/Gson、Python 用 json、Go 用 encoding/json。

## 注意点

循环引用、大整数精度丢失、日期格式、Unicode 转义需特别处理。

## 代码示例

```json
JSON.stringify({a:1, b:[2,3]})
```

## 推荐在线工具

- [/format](/format)
- [/minify](/minify)

## 小结

JSON 序列化将对象转为 JSON 字符串，各语言有成熟库，本文介绍原理与选型。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
