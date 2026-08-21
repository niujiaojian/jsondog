---
title: "JSON Pointer 详解"
description: "JSON Pointer (RFC 6901) 用斜杠路径定位 JSON 节点，如 /a/b/0。"
date: "2026-08-19"
category: "进阶"
keywords: ["json pointer","rfc 6901","json路径"]
---

# JSON Pointer 详解

JSON Pointer 是 RFC 6901 定义的用斜杠分隔路径定位 JSON 节点的语法，是 JSON Patch 的基础。

## 语法

以 / 开头，每段为键名或数组索引，如 /user/name、/list/0。特殊字符需转义。

## 与 JSONPath 区别

JSON Pointer 更简单，仅定位单一节点；JSONPath 支持通配与过滤，可返回多节点。

## 代码示例

```json
/user/address/city
```

## 推荐在线工具

- [/jsonpath](/jsonpath)
- [/tree](/tree)

## 小结

JSON Pointer (RFC 6901) 用斜杠路径定位 JSON 节点，如 /a/b/0。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
