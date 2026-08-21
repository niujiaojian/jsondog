---
title: "JSON 转 Protobuf 教程"
description: "根据 JSON 生成 Protobuf 消息定义，用于 gRPC 与跨语言序列化。"
date: "2026-08-19"
category: "代码生成"
keywords: ["json转protobuf","protobuf","grpc"]
---

# JSON 转 Protobuf 教程

根据 JSON 生成 Protobuf message 定义，用于 gRPC 服务与高效跨语言数据交换。

## 类型映射

string→string、number→int32/double、boolean→bool、array→repeated、object→嵌套 message。

## 优势

Protobuf 体积更小、解析更快、跨语言，适合高性能场景。

## 代码示例

```json
{"id": 1, "name": "x"}
```

## 推荐在线工具

- [/codegen/java](/codegen/java)
- [/format](/format)

## 小结

根据 JSON 生成 Protobuf 消息定义，用于 gRPC 与跨语言序列化。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
