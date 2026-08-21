---
title: "JWT (JSON Web Token) 详解"
description: "JWT 是用 JSON 表示的紧凑令牌，用于身份认证与信息交换，由 header.payload.signature 组成。"
date: "2026-08-19"
category: "进阶"
keywords: ["jwt","json web token","jwt认证"]
---

# JWT (JSON Web Token) 详解

JWT（JSON Web Token）是用 JSON 表示的紧凑、URL 安全的令牌，广泛用于无状态身份认证。

## 结构

由 header、payload、signature 三部分用点号连接，每部分 Base64URL 编码的 JSON。

## 使用流程

登录返回 JWT，客户端携带请求，服务端验签解析 payload 获取用户信息。

## 代码示例

```json
header.payload.signature
```

## 推荐在线工具

- [/encode](/encode)
- [/format](/format)

## 小结

JWT 是用 JSON 表示的紧凑令牌，用于身份认证与信息交换，由 header.payload.signature 组成。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
