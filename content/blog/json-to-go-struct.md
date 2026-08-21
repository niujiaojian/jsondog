---
title: "JSON 转 Go struct 教程"
description: "根据 JSON 生成 Go 结构体，含 json tag，用于 Go 后端快速建模。"
date: "2026-08-19"
category: "代码生成"
keywords: ["json转go","json to golang","go struct"]
---

# JSON 转 Go struct 教程

根据 JSON 生成 Go 结构体定义，自动添加 json tag，用于 Go 后端反序列化建模。

## 类型映射

string→string、number→int/float64、boolean→bool、array→slice、object→嵌套 struct。

## tag 生成

默认生成 `json:"key"` tag，可选 omitempty。

## 代码示例

```json
{"id": 1, "name": "x"}
```

## 推荐在线工具

- [/codegen/java](/codegen/java)
- [/format](/format)

## 小结

根据 JSON 生成 Go 结构体，含 json tag，用于 Go 后端快速建模。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
