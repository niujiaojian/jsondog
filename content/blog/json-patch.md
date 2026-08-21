---
title: "JSON Patch 操作详解"
description: "JSON Patch (RFC 6902) 用一组操作描述 JSON 变更，支持 add/remove/replace/move/copy/test。"
date: "2026-08-19"
category: "进阶"
keywords: ["json patch","rfc 6902","json变更"]
---

# JSON Patch 操作详解

JSON Patch 是 RFC 6902 定义的用操作数组描述 JSON 变更的格式，常用于增量更新与协同。

## 操作类型

add 添加、remove 删除、replace 替换、move 移动、copy 复制、test 测试。

## 使用场景

API 增量更新、协同编辑、版本差异表达。

## 代码示例

```json
[{"op":"replace","path":"/name","value":"新值"}]
```

## 推荐在线工具

- [/diff](/diff)
- [/format](/format)

## 小结

JSON Patch (RFC 6902) 用一组操作描述 JSON 变更，支持 add/remove/replace/move/copy/test。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
