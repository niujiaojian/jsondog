---
title: "JSON 对比与差异分析"
description: "JSON 对比工具递归比较两段 JSON，输出新增、删除、修改的节点路径。"
date: "2026-08-19"
category: "工具"
keywords: ["json对比","json diff","json compare"]
---

# JSON 对比与差异分析

JSON 对比工具递归比较两段 JSON 的差异，输出每个新增、删除、修改节点的路径，便于排查变更。

## 对比规则

对象按键名比较不区分顺序，数组按索引比较，基本值按相等比较。

## 使用场景

对比 API 两次返回、排查配置变更、版本差异分析。

## 代码示例

```json
{"a":1,"b":2} vs {"a":1,"c":3}
```

## 推荐在线工具

- [/diff](/diff)
- [/format](/format)

## 小结

JSON 对比工具递归比较两段 JSON，输出新增、删除、修改的节点路径。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
