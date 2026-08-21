---
title: "JSON5 扩展语法介绍"
description: "JSON5 是 JSON 的超集，支持注释、单引号、尾逗号、多行字符串等扩展，更易读写。"
date: "2026-08-19"
category: "基础"
keywords: ["json5","json5语法","json注释"]
---

# JSON5 扩展语法介绍

JSON5 是 JSON 的扩展格式，在保持兼容的同时增加了注释、单引号、尾逗号等便利特性，深受开发者喜爱。

## JSON5 扩展

支持单行 // 与多行 /* */ 注释、单引号字符串、对象数组尾逗号、无引号键名、十六进制数字等。

## 兼容性

JSON5 是 JSON 的超集，合法 JSON 必定是合法 JSON5，反之不成立。JSONDog 全工具支持 JSON5。

## 代码示例

```json
{
  // 这是注释
  name: "JSONDog",
  tools: ["format", "validate",]
}
```

## 推荐在线工具

- [/format](/format)
- [/validate](/validate)

## 小结

JSON5 是 JSON 的超集，支持注释、单引号、尾逗号、多行字符串等扩展，更易读写。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
