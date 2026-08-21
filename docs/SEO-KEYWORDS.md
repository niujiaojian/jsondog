# SEO 关键词矩阵与策略

> 目标：Google 主战场，中英双站，每工具页聚焦 1 主词 + 3-5 长尾

---

## 1. 技术SEO基础（决定能否被收录）

| 项 | 要求 |
|----|------|
| 渲染 | Nuxt SSG，每工具独立静态 HTML（SPA 不被抓取） |
| URL | 每工具独立路径 `/json-to-yaml`，连字符分词，含关键词 |
| sitemap.xml | 自动生成，提交 Google Search Console |
| robots.txt | 允许全站，指 sitemap |
| hreflang | 中英互指 `<link rel="alternate" hreflang="en/zh">` |
| canonical | 每页自指 canonical，防重复 |
| Core Web Vitals | LCP<2.5s / INP<200ms / CLS<0.1（编辑器懒加载） |
| 结构化数据 | SoftwareApplication + FAQPage + BreadcrumbList |

---

## 2. 工具页关键词矩阵

> 每页配齐：URL | H1 | `<title>` | meta description | 主词 | 长尾 | FAQ

### 2.1 第一期工具

| URL | H1 | title | 主词 | 长尾 |
|-----|----|----|------|------|
| `/format` | JSON Formatter Online | JSON Formatter & Beautifier Online - Free | json formatter | beautify json, pretty print json, indent json online |
| `/minify` | JSON Minifier | JSON Minifier - Compress JSON Online | json minifier | compress json, minify json online, single line json |
| `/validate` | JSON Validator | JSON Validator - Check JSON Syntax Online | json validator | validate json online, json syntax checker, json linter |
| `/tree` | JSON Tree Viewer | JSON Tree Viewer - Expand/Collapse Online | json tree viewer | json viewer online, json explorer, json tree formatter |
| `/editor` | JSON Editor | JSON Editor Online - Syntax Highlighting | json editor | online json editor, edit json online, json code editor |
| `/escape` | JSON Escape / Unescape | JSON Escape & Unescape Online | json escape | escape json string, unescape json, json string escape online |
| `/convert/yaml` | JSON to YAML Converter | JSON to YAML Converter Online - Free | json to yaml | convert json to yaml, json yaml converter, yaml to json |
| `/convert/xml` | JSON to XML Converter | JSON to XML Converter Online | json to xml | convert json to xml, json xml converter, xml to json |
| `/convert/csv` | JSON to CSV Converter | JSON to CSV Converter Online | json to csv | convert json to csv, json csv converter, csv to json |
| `/convert/toml` | JSON to TOML Converter | JSON to TOML Converter Online | json to toml | convert json to toml, toml to json |
| `/jsonpath` | JSONPath Query Tester | JSONPath Tester - Query JSON Online | jsonpath | jsonpath online, json path query, jsonpath tester |

### 2.2 第二期代码生成（长尾量大）

| URL | 主词 | 长尾 |
|-----|------|------|
| `/codegen/typescript` | json to typescript | json to ts interface, json to type, json2ts |
| `/codegen/java` | json to java | json to pojo, json to java class online |
| `/codegen/go` | json to go | json to golang struct, json to go struct |
| `/codegen/csharp` | json to csharp | json to c# class, json to csharp model |
| `/codegen/python` | json to python | json to python class, json to pydantic |
| `/codegen/rust` | json to rust | json to rust struct, json to serde |
| `/codegen/sql` | json to sql | json to sql create table, json to ddl |
| `/codegen/mybatis` | json to mybatis | json to mapper xml, mybatis generator online |
| `/schema` | json schema generator | json schema validator, json to schema, validate against schema |
| `/convert/xlsx` | json to excel | json to xlsx, json to excel online, export json to excel |

### 2.3 第三期

| URL | 主词 | 长尾 |
|-----|------|------|
| `/diff` | json diff | json compare, json difference, compare two json |
| `/mock` | json mock generator | mock json data, fake json generator, json schema mock |
| `/flatten` | json flatten | flatten json online, unflatten json, json dot notation |
| `/visualize` | json visualizer | visualize json, json to chart, json graph |
| `/encode` | json base64 | json to base64, base64 to json, url encode json |

---

## 3. 每页 meta description 模板

```
[主词大写] online — free, no signup, 100% in your browser. [卖点: works offline / no upload]. [1个长尾用法].
```
例：`JSON to YAML Converter online — free, no signup, 100% in your browser. Your data never leaves your device. Convert both directions instantly.`

---

## 4. 结构化数据（Schema.org，出富摘要）

每工具页注入 3 类 schema：

### 4.1 SoftwareApplication
```json
{
  "@context":"https://schema.org",
  "@type":"SoftwareApplication",
  "name":"JSON to YAML Converter",
  "applicationCategory":"DeveloperApplication",
  "operatingSystem":"Web",
  "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
  "url":"https://jsonbox.dev/convert/yaml"
}
```

### 4.2 FAQPage（每页 3-5 问）
```json
{
  "@type":"FAQPage",
  "mainEntity":[
    {"@type":"Question","name":"Is JSON to YAML conversion free?","acceptedAnswer":{"@type":"Answer","text":"Yes, 100% free and runs entirely in your browser."}}
  ]
}
```

### 4.3 BreadcrumbList
`Home > Convert > JSON to YAML`

---

## 5. 内链策略

- 每工具页底部 **Related tools** 5-8 个（同类别优先）
- 面包屑全站统一
- 首页工具宫格全量链接
- 博客文中自然内链到工具页

---

## 6. 内容引流（长期 SEO）

### 6.1 博客（/blog）
| 文章 | 目标关键词 |
|------|-----------|
| JSON vs YAML: What's the Difference | json vs yaml |
| JSONPath Syntax Cheat Sheet | jsonpath syntax |
| JSON Schema Complete Guide | json schema tutorial |
| How to Convert JSON to TypeScript | json to typescript |
| JSON Best Practices for APIs | json best practices |
| Understanding JSON Escaping | json escape characters |

### 6.2 速查表（/cheatsheet）
JSON 语法速查，易被收藏 + 外链

### 6.3 示例库（/examples）
各行业 JSON 样例（API 返回、配置文件、嵌套结构），吸引 "json example" 流量

---

## 7. 外链建设

| 渠道 | 动作 |
|------|------|
| Product Hunt | 英文站 Launch |
| Hacker News | Show HN |
| Reddit | r/webdev, r/javascript, r/programming |
| dev.to | 工具介绍文 |
| GitHub | 开源，README 链回 |
| 掘金 / V2EX / 少数派 | 中文站引流 |

---

## 8. 差异化卖点（写进每页 description）

- "100% client-side, your data never leaves your browser"
- "Works offline — install as PWA"
- "No ads in editor, no signup, no limits"

---

## 9. 监测

- Google Search Console：收录、点击、展示、CTR、排名
- GA4：流量、停留、跳出
- Ahrefs/SEMrush（或免费 Ubersuggest）：关键词量+难度跟踪
- 每月复盘：扩词、补内容、调 title