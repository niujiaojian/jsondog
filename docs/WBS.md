# 开发任务拆解 WBS

> 技术栈：Nuxt 3 (SSG) + Vue 3 Composition API + TS + Element Plus + TailwindCSS + Monaco
> 部署：Vercel / Cloudflare Pages · 纯前端零后端

---

## 阶段总览

| 阶段 | 内容 | 里程碑 |
|------|------|--------|
| P0 | 项目脚手架 + 全局基建 | 可运行的空壳站 |
| P1 | 8 个 MVP 工具 | MVP 功能完成 |
| P2 | SEO + i18n + PWA | 可上线可收录 |
| P3 | 第二期代码生成工具 | SEO 扩量 |
| P4 | 第三期高级工具 + 博客 | 长期引流 |

---

## P0 · 项目脚手架与全局基建

| ID | 任务 | 依赖 | 优先级 |
|----|------|------|--------|
| 0.1 | Nuxt 3 + TS + TailwindCSS + Element Plus 初始化 | - | 高 |
| 0.2 | 暗色默认主题 + ThemeToggle + localStorage | 0.1 | 高 |
| 0.3 | 字体加载 JetBrains Mono / Inter | 0.1 | 中 |
| 0.4 | `<ToolLayout>` 双栏容器 + 状态栏组件 | 0.1 | 高 |
| 0.5 | `<JsonInput>` / `<JsonOutput>` 通用组件 | 0.4 | 高 |
| 0.6 | `<ErrorReport>` 错误报告组件（行/列/类型/建议） | 0.4 | 高 |
| 0.7 | `<CommandPalette>` Ctrl+K 工具搜索 | 0.1 | 中 |
| 0.8 | 快捷键指令系统（Ctrl+Enter/S/K/Shift+L） | 0.1 | 中 |
| 0.9 | Web Worker 封装（大文件解析） | 0.1 | 高 |
| 0.10 | 首页工具宫格 + hero 输入框 | 0.1 | 高 |
| 0.11 | 顶部导航 + 分类下拉 | 0.1 | 高 |
| 0.12 | `/about` `/privacy` `/changelog` 静态页 | 0.1 | 低 |

---

## P1 · MVP 8 工具

| ID | 任务 | 依赖 | 核心库 | 优先级 |
|----|------|------|--------|--------|
| 1.1 | `/format` 格式化（缩进 2/4/Tab） | 0.5 | json5 | 高 |
| 1.2 | `/minify` 压缩 | 0.5 | json5 | 高 |
| 1.3 | `/validate` 校验 + 错误报告 | 0.6 | json5 | 高 |
| 1.4 | `/tree` 树查看器（折叠/搜索/路径复制） | 0.4 | 自研 | 高 |
| 1.5 | `/editor` Monaco 编辑器（懒加载+实时校验） | 0.9 | Monaco | 高 |
| 1.6 | `/escape` 转义/反转义 | 0.5 | 自研 | 中 |
| 1.7 | `/convert/yaml` 双向 | 0.5 | yaml | 高 |
| 1.8 | `/convert/xml` 双向 | 0.5 | fast-xml-parser | 高 |
| 1.9 | `/convert/csv` 双向 | 0.5 | csv-parse | 中 |
| 1.10 | `/convert/toml` 双向 | 0.5 | @iarna/toml | 中 |
| 1.11 | `/jsonpath` 查询 + 高亮 | 0.5 | jsonpath-plus | 中 |
| 1.12 | 每工具配 3 内置示例 | 1.1-1.11 | - | 中 |
| 1.13 | 粘贴自动识别（首页 hero） | 1.1-1.11 | - | 低 |

---

## P2 · SEO / i18n / PWA / 上线

| ID | 任务 | 依赖 | 优先级 |
|----|------|------|--------|
| 2.1 | @nuxtjs/i18n 中英双语 + hreflang | P0 | 高 |
| 2.2 | 每工具页 title/description/H1（见 SEO 矩阵） | P1 | 高 |
| 2.3 | 首屏 SEO 文案 + FAQ 区块 | P1 | 高 |
| 2.4 | 结构化数据 SoftwareApplication + FAQPage + Breadcrumb | 2.2 | 高 |
| 2.5 | sitemap.xml + robots.txt 自动生成 | P1 | 高 |
| 2.6 | canonical + meta 标签统一 | P0 | 高 |
| 2.7 | `<RelatedTools>` 内链组件 | P1 | 中 |
| 2.8 | PWA manifest + service worker | P0 | 中 |
| 2.9 | Lighthouse 调优（SEO>95, Perf>90） | 2.1-2.8 | 高 |
| 2.10 | GA4 + Microsoft Clarity 接入 | P0 | 低 |
| 2.11 | 部署 Vercel/Cloudflare Pages + 自定义域名 | 2.9 | 高 |
| 2.12 | Google Search Console 提交 sitemap | 2.11 | 高 |

---

## P3 · 第二期代码生成工具

| ID | 任务 | 核心库 | 优先级 |
|----|------|--------|--------|
| 3.1 | `/codegen/typescript` | quicktype-core | 高 |
| 3.2 | `/codegen/java` `/go` `/csharp` `/python` `/rust` | quicktype-core | 高 |
| 3.3 | `/codegen/sql` 建表语句 | 自研 | 中 |
| 3.4 | `/codegen/mybatis` Mapper XML | 自研 | 中 |
| 3.5 | `/schema` JSON Schema 生成/校验 | ajv | 中 |
| 3.6 | `/convert/xlsx` JSON→Excel | SheetJS | 中 |
| 3.7 | `/convert/md` JSON→Markdown 表格 | 自研 | 低 |
| 3.8 | 各页 SEO + 结构化数据 | - | 高 |

---

## P4 · 第三期高级工具 + 内容

| ID | 任务 | 核心库 | 优先级 |
|----|------|--------|--------|
| 4.1 | `/diff` JSON 对比 | fast-json-patch | 中 |
| 4.2 | `/mock` Mock 生成 | json-schema-faker | 中 |
| 4.3 | `/flatten` 扁平化/反扁平化 | 自研 | 低 |
| 4.4 | `/transform` 键排序/合并/拆分 | 自研 | 低 |
| 4.5 | `/visualize` 图表可视化 | ECharts | 低 |
| 4.6 | `/encode` Base64/URL 编解码 | 自研 | 低 |
| 4.7 | `/diagram` ER 图/PlantUML | 自研 | 低 |
| 4.8 | `/blog` 博客系统（Markdown 内容） | @nuxt/content | 中 |
| 4.9 | 6 篇首发 SEO 文章（见 SEO 文档） | 4.8 | 中 |
| 4.10 | `/cheatsheet` 速查表 | - | 低 |
| 4.11 | `/examples` 示例库 | - | 低 |

---

## 关键依赖与风险

| 风险 | 应对 |
|------|------|
| Monaco 体积大拖慢 LCP | 路由级懒加载，工具页才引入 |
| 大文件卡 UI | 统一走 Web Worker |
| SSG 下 i18n 路由复杂 | 用 @nuxtjs/i18n SSG 模式，预生成两语言静态页 |
| quickcode 浏览器端体积 | 按需引入，或改用轻量自研生成器 |
| 新 gTLD `.dev`/`.tools` 收录 | 提交 GSC + 外链建设加速信任 |

---

## 建议执行顺序

1. **P0 全部** → 跑通空壳
2. **P1 的 1.1-1.5**（5 个最高频工具）→ 内部可用
3. **P2 的 2.1-2.6, 2.11-2.12** → 最小可上线可收录版
4. **P1 剩余 + 2.7-2.10** → MVP 完整
5. **P3** → SEO 扩量
6. **P4** → 长期内容引流

---

## 验收检查清单（MVP 上线前）

- [ ] 8 工具功能正确，边界用例通过（空/超大/非法/嵌套）
- [ ] Lighthouse：SEO>95, Performance>90, A11y>90, Best Practices>95
- [ ] 中英双语完整，hreflang 正确
- [ ] 暗色默认，移动端单栏可用
- [ ] 10MB 文件 Web Worker 不卡
- [ ] sitemap.xml / robots.txt / canonical / 结构化数据就位
- [ ] /privacy 声明纯前端
- [ ] GA4 + Clarity 上报正常
- [ ] GSC 已提交 sitemap