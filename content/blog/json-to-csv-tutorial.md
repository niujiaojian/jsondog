---
title: "JSON 转 CSV 教程"
description: "JSON 转 CSV 用于导出表格，仅适合数组对象结构，嵌套需先扁平化。"
date: "2026-08-19"
category: "工具"
keywords: ["json转csv","json to csv","csv导出"]
---

# JSON 转 CSV 教程

将 JSON 转 CSV 用于导入 Excel 或数据库，仅适合扁平的数组对象结构。

## 转换条件

JSON 须为对象数组，每个对象的键作为列名，值作为单元格。

## 嵌套处理

嵌套对象或数组需先扁平化为点路径键，否则无法映射到列。

## 代码示例

```json
[{"id":1,"name":"a"},{"id":2,"name":"b"}]
```

## 推荐在线工具

- [/convert/csv](/convert/csv)
- [/flatten](/flatten)

## 小结

JSON 转 CSV 用于导出表格，仅适合数组对象结构，嵌套需先扁平化。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
