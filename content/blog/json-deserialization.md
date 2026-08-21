---
title: "JSON 反序列化注意事项"
description: "JSON 反序列化将字符串转为对象，需注意类型丢失、精度、安全与错误处理。"
date: "2026-08-19"
category: "进阶"
keywords: ["json反序列化","json parse","反序列化"]
---

# JSON 反序列化注意事项

JSON 反序列化将 JSON 字符串解析为内存对象，过程中需注意类型、精度与安全。

## 常见问题

大整数精度丢失（JS Number 限制）、日期需手动转换、类型信息丢失、非法 JSON 抛错。

## 安全

避免 eval 解析（注入风险），使用 JSON.parse；注意原型链污染。

## 代码示例

```json
JSON.parse('{"a":1}')
```

## 推荐在线工具

- [/validate](/validate)
- [/format](/format)

## 小结

JSON 反序列化将字符串转为对象，需注意类型丢失、精度、安全与错误处理。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
