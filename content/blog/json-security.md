---
title: "JSON 安全注意事项"
description: "JSON 处理需防注入、原型链污染、XSS、敏感信息泄露，本文列举安全要点。"
date: "2026-08-19"
category: "进阶"
keywords: ["json安全","json注入","原型链污染"]
---

# JSON 安全注意事项

处理不可信 JSON 时需注意多种安全风险，避免注入与信息泄露。

## 风险点

原型链污染（__proto__）、JSONP XSS、eval 解析注入、敏感字段泄露、大数 DoS。

## 防护

用 JSON.parse 而非 eval、过滤危险键、限制大小、脱敏敏感数据。

## 代码示例

```json
{"__proto__": {"polluted": true}}
```

## 推荐在线工具

- [/validate](/validate)
- [/format](/format)

## 小结

JSON 处理需防注入、原型链污染、XSS、敏感信息泄露，本文列举安全要点。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
