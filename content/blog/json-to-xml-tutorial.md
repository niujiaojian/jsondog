---
title: "JSON 转 XML 教程"
description: "JSON 转 XML 用于与遗留系统交互，本文介绍转换规则与属性处理。"
date: "2026-08-19"
category: "工具"
keywords: ["json转xml","json to xml","xml转换"]
---

# JSON 转 XML 教程

将 JSON 转为 XML 用于与遗留 Web Service 或配置系统交互，需注意结构映射。

## 转换规则

对象转元素、键转子元素或属性、数组转重复元素、值转文本节点。

## 局限

JSON 无属性概念，转 XML 时键名既可作元素也可作属性，需约定。

## 代码示例

```json
{"person": {"name": "张三", "age": 28}}
```

## 推荐在线工具

- [/convert/xml](/convert/xml)
- [/format](/format)

## 小结

JSON 转 XML 用于与遗留系统交互，本文介绍转换规则与属性处理。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
