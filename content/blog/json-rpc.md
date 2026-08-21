---
title: "JSON-RPC 协议详解"
description: "JSON-RPC 是基于 JSON 的远程过程调用协议，轻量、无状态，支持 HTTP 与 WebSocket。"
date: "2026-08-19"
category: "进阶"
keywords: ["json-rpc","json rpc","远程调用"]
---

# JSON-RPC 协议详解

JSON-RPC 是一种基于 JSON 的轻量级远程过程调用协议，用 JSON 描述请求与响应。

## 消息结构

请求含 jsonrpc、method、params、id；响应含 result 或 error 与对应 id。

## 使用场景

区块链节点交互、内部微服务通信、WebSocket 接口。

## 代码示例

```json
{"jsonrpc":"2.0","method":"getUser","params":[1],"id":1}
```

## 推荐在线工具

- [/format](/format)
- [/validate](/validate)

## 小结

JSON-RPC 是基于 JSON 的远程过程调用协议，轻量、无状态，支持 HTTP 与 WebSocket。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
