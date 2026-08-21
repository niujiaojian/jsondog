---
title: "JSON 转 SQL 建表语句教程"
description: "根据 JSON 结构生成 SQL CREATE TABLE 语句，推断字段类型，快速建表。"
date: "2026-08-19"
category: "工具"
keywords: ["json转sql","json to sql","json建表"]
---

# JSON 转 SQL 建表语句教程

根据 JSON 结构生成 SQL CREATE TABLE 语句，自动推断列类型，用于快速建表与数据建模。

## 类型推断

string→VARCHAR/TEXT、number→INT/BIGINT、boolean→TINYINT、日期→DATETIME。

## 适用场景

快速为 JSON 数据设计表结构，导入数据库存储。

## 代码示例

```json
{"id": 1, "name": "x", "created_at": "2026-01-01"}
```

## 推荐在线工具

- [/codegen/sql](/codegen/sql)
- [/format](/format)

## 小结

根据 JSON 结构生成 SQL CREATE TABLE 语句，推断字段类型，快速建表。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
