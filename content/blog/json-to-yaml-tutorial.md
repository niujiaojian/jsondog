---
title: "JSON 转 YAML 教程"
description: "将 JSON 转换为 YAML 可获得更简洁的配置格式，本文介绍转换方法与注意事项。"
date: "2026-08-19"
category: "工具"
keywords: ["json转yaml","json to yaml","yaml转换"]
---

# JSON 转 YAML 教程

将 JSON 转为 YAML 可去除括号引号，用缩进表示层级，更适合配置文件。

## 转换规则

对象转 YAML 键值对、数组转列表、字符串去引号、布尔数字原样。

## 注意点

YAML 对缩进敏感，转换后需检查缩进；特殊字符可能仍需引号。

## 代码示例

```json
{"server": {"port": 8080, "host": "localhost"}}
```

## 推荐在线工具

- [/convert/yaml](/convert/yaml)
- [/format](/format)

## 小结

将 JSON 转换为 YAML 可获得更简洁的配置格式，本文介绍转换方法与注意事项。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
