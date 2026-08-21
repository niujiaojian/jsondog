---
title: "JSON 转 Rust struct 教程"
description: "根据 JSON 生成 Rust 结构体与 serde derive，用于 Rust 后端建模。"
date: "2026-08-19"
category: "代码生成"
keywords: ["json转rust","json to rust","serde"]
---

# JSON 转 Rust struct 教程

根据 JSON 生成 Rust 结构体，自动添加 serde derive 宏，用于 Rust 序列化。

## 类型映射

string→String、number→i64/f64、boolean→bool、array→Vec、object→嵌套 struct。

## serde 配置

生成 #[derive(Serialize, Deserialize)] 与 rename_all 处理命名。

## 代码示例

```json
{"id": 1, "name": "x"}
```

## 推荐在线工具

- [/codegen/java](/codegen/java)
- [/format](/format)

## 小结

根据 JSON 生成 Rust 结构体与 serde derive，用于 Rust 后端建模。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
