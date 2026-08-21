---
title: "JSON 转 TypeScript 接口教程"
description: "根据 JSON 自动生成 TypeScript interface 或 type，省去手写类型定义。"
date: "2026-08-19"
category: "工具"
keywords: ["json转typescript","json to ts","json to interface"]
---

# JSON 转 TypeScript 接口教程

根据 JSON 样本自动推断并生成 TypeScript 接口类型，省去手写 type 定义，提升开发效率。

## 生成原理

遍历 JSON 结构，对象生成 interface，数组推断联合类型，基本类型映射 TS 类型。

## 使用建议

提供有代表性的样本，确保类型推断准确；可设 readonly、export 选项。

## 代码示例

```json
{"id": 1, "name": "x", "tags": ["a"]}
```

## 推荐在线工具

- [/codegen/typescript](/codegen/typescript)
- [/format](/format)

## 小结

根据 JSON 自动生成 TypeScript interface 或 type，省去手写类型定义。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
