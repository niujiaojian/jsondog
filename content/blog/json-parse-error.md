---
title: "JSON 解析错误排查指南"
description: "JSON.parse 报错时如何定位：看错误位置、检查行列、用校验工具。"
date: "2026-08-19"
category: "错误调试"
keywords: ["json解析错误","json parse error","unexpected token"]
---

# JSON 解析错误排查指南

JSON.parse 抛错时需快速定位，本文给出排查步骤。

## 定位步骤

看错误信息中的位置、用校验工具标红行列、检查该处字符与上下文。

## 常见原因

非法字符、未转义引号、括号不匹配、混入 BOM 或非 JSON 内容。

## 代码示例

```json
{"a": 1, "b": 2,}
```

## 推荐在线工具

- [/validate](/validate)
- [/format](/format)

## 小结

JSON.parse 报错时如何定位：看错误位置、检查行列、用校验工具。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
