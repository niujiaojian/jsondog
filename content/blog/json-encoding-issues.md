---
title: "JSON 编码问题：中文与 Unicode"
description: "JSON 中文与 Unicode 编码问题：\\u 转义、UTF-8 BOM、乱码排查。"
date: "2026-08-19"
category: "错误调试"
keywords: ["json编码","json中文","json unicode"]
---

# JSON 编码问题：中文与 Unicode

JSON 涉及中文与 Unicode 时易出现编码问题，需正确处理。

## 中文处理

JSON 允许直接写中文（UTF-8），也可能被转义为 \uXXXX，两者等价。

## 乱码排查

检查文件编码是否 UTF-8、有无 BOM、Content-Type 是否声明 charset。

## 代码示例

```json
{"name": "中文", "emoji": "\u4e2d"}
```

## 推荐在线工具

- [/encode](/encode)
- [/format](/format)

## 小结

JSON 中文与 Unicode 编码问题：\u 转义、UTF-8 BOM、乱码排查。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
