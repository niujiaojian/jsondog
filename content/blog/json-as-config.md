---
title: "JSON 作为配置文件"
description: "JSON 常用作配置文件，但不支持注释，可考虑 JSON5 或 JSONC 替代。"
date: "2026-08-19"
category: "场景"
keywords: ["json配置","json config","jsonc"]
---

# JSON 作为配置文件

JSON 常用作配置文件（如 tsconfig、package.json），但不支持注释，编辑不便。

## 优缺点

优点：标准、解析快、跨语言；缺点：无注释、无多行字符串、尾逗号非法。

## 替代方案

JSON5、JSONC（带注释）、YAML、TOML 更适合人工编辑的配置。

## 代码示例

```json
{
  "compilerOptions": {
    "target": "es2020"
  }
}
```

## 推荐在线工具

- [/format](/format)
- [/validate](/validate)

## 小结

JSON 常用作配置文件，但不支持注释，可考虑 JSON5 或 JSONC 替代。 JSONDog 提供全套 JSON 在线工具，纯前端、零上传、中英双语，欢迎免费使用。
