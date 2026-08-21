---
title: "JSON 转 Java POJO 教程"
description: "根据 JSON 生成 Java POJO 类，含字段、getter/setter，用于快速建模。"
date: "2026-08-19"
category: "工具"
keywords: ["json转java","json to pojo","json to java class"]
---

# JSON 转 Java POJO 教程

根据 JSON 生成 Java POJO 类，自动推断字段类型并生成属性、构造器等，加速后端建模。

## 类型映射

string→String、number→Long/Double、boolean→Boolean、array→List、object→嵌套类。

## 生成选项

可选包名、是否生成 getter/setter、Lombok 注解等。

## 代码示例

```json
{"id": 1, "name": "x", "price": 9.9}
```

## 推荐在线工具

- [/codegen/java](/codegen/java)
- [/format](/format)

## 小结

根据 JSON 生成 Java POJO 类，含字段、getter/setter，用于快速建模。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
