---
title: "JSONPath 查询语法教程"
description: "JSONPath 是按路径表达式查询 JSON 的语言，类似 XPath。本文讲解常用语法。"
date: "2026-08-19"
category: "工具"
keywords: ["jsonpath","json path","json查询"]
---

# JSONPath 查询语法教程

JSONPath 是一种按路径表达式从 JSON 中提取数据的查询语言，语法类似 XPath，强大且简洁。

## 常用语法

$ 根节点、. 子键、[] 数组索引、* 通配、.. 递归下降。如 $.store.book[0].title。

## 使用场景

从大型 JSON 中精确提取字段，避免手动遍历，常用于 API 数据筛选。

## 代码示例

```json
$.store.book[*].author
```

## 推荐在线工具

- [/jsonpath](/jsonpath)
- [/tree](/tree)

## 小结

JSONPath 是按路径表达式查询 JSON 的语言，类似 XPath。本文讲解常用语法。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
