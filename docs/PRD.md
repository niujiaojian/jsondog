# JSON 工具箱 PRD v1.0

> 纯前端、零上传、中英双语的 JSON 专用工具集合站

---

## 1. 产品定位

**一句话**：专注 JSON、只做 JSON 的在线工具箱，做"JSON 工具的瑞士军刀"。

**差异化四字诀**：
- **全**：功能最全（格式化/校验/转换/代码生成/可视化/Diff/Mock…）
- **快**：纯前端即时计算，无网络往返
- **纯**：编辑区无广告、无弹窗、无登录
- **隐私**：100% 浏览器内运算，数据永不上传

---

## 2. 目标用户

| 层级 | 人群 | 占比目标 |
|------|------|----------|
| 主 | 开发者 + 数据处理人员（分析师/运营/测试） | 70% |
| 次 | 纯开发者（写代码、调 API、造 Mock） | 25% |
| 边 | 普通用户（校验配置、看接口返回） | 5% |

**设计基调**：专业但不冷峻，保留傻瓜化默认视图，术语处配 1 句解释。

---

## 3. 功能清单

### 第一期 MVP（8 个，核心引流）

| # | 工具 | URL | 输入 → 输出 | 核心库 |
|---|------|-----|-----------|--------|
| 1 | 格式化/美化 | `/format` | JSON → 缩进JSON | `json5` |
| 2 | 压缩/Minify | `/minify` | JSON → 单行JSON | `json5` |
| 3 | 校验 | `/validate` | JSON → 错误报告(行/列/类型/修复建议) | `json5` |
| 4 | 树形查看器 | `/tree` | JSON → 可折叠树+搜索+路径复制 | 自研 |
| 5 | 编辑器 | `/editor` | 双向编辑+实时校验+语法高亮 | Monaco |
| 6 | 转义/反转义 | `/escape` | 字符串 ↔ 转义串 | 自研 |
| 7 | 格式互转 | `/convert/{yaml,xml,csv,toml}` | JSON ↔ YAML/XML/CSV/TOML | `yaml`/`fast-xml-parser`/`csv-parse` |
| 8 | JSONPath 查询 | `/jsonpath` | JSON+表达式 → 高亮结果集 | `jsonpath-plus` |

### 第二期 代码生成（强 SEO，引流长尾）

| # | 工具 | URL | 核心库 |
|---|------|-----|--------|
| 9 | JSON → TypeScript | `/codegen/typescript` | `quicktype-core` |
| 10 | JSON → Java/Go/C#/Python/Rust | `/codegen/{lang}` | `quicktype-core` |
| 11 | JSON → SQL 建表 | `/codegen/sql` | 自研 |
| 12 | JSON → MyBatis Mapper XML | `/codegen/mybatis` | 自研 |
| 13 | JSON Schema 生成/校验 | `/schema` | `ajv` |
| 14 | JSON → Markdown 表格 / Excel | `/convert/{md,xlsx}` | `SheetJS` |

### 第三期 高级 & 可视化

| # | 工具 | URL | 核心库 |
|---|------|-----|--------|
| 15 | Diff 对比 | `/diff` | `fast-json-patch` |
| 16 | Mock 数据生成 | `/mock` | `json-schema-faker` |
| 17 | 扁平化/反扁平化 | `/flatten` | 自研 |
| 18 | 键排序/合并/拆分 | `/transform` | 自研 |
| 19 | 可视化图表 | `/visualize` | `ECharts` |
| 20 | ER 图 / PlantUML | `/diagram` | 自研 |
| 21 | Base64/URL 编解码 | `/encode` | 自研 |
| 22 | JSON → OpenAPI | `/codegen/openapi` | 自研 |

---

## 4. 信息架构

```
首页 /                     工具宫格 + 大输入框(粘贴自动识别)
├── /format /minify /validate /tree /editor /escape
├── /convert/yaml /convert/xml /convert/csv /convert/toml
├── /convert/md /convert/xlsx
├── /jsonpath /schema /diff /mock /flatten /transform
├── /visualize /diagram /encode
├── /codegen/typescript /codegen/{java,go,csharp,python,rust}
├── /codegen/sql /codegen/mybatis /codegen/openapi
├── /blog                     SEO 长文
├── /cheatsheet               JSON 语法速查
├── /examples                 各行业 JSON 示例库
├── /about /privacy /changelog
└── /sitemap.xml /robots.txt
```

---

## 5. 交互规范

- **统一布局**：左输入 / 右输出 双栏，顶部 Tab 切工具，底部状态栏
- **状态栏**：字符数 / 行数 / 节点数 / 大小 / 耗时
- **快捷键**：
  - `Ctrl+Enter` 执行
  - `Ctrl+K` 命令面板搜工具
  - `Ctrl+S` 复制结果
  - `Ctrl+Shift+L` 切换主题
- **粘贴自动识别**（差异化卖点）：粘贴后按内容特征推荐跳转工具
- **错误提示**：行号 + 列号 + 错误类型 + 人话修复建议
- **示例下拉**：每工具配 3 个内置示例
- **操作按钮**：复制 / 下载文件 / 上传文件 / 清空 / 撤销
- **历史记录**：LocalStorage 存最近 10 条（可选关闭）

---

## 6. 设计风格

- **主题**：暗色默认（跟随系统），可切浅色
- **字体**：`JetBrains Mono`（JSON 区等宽）/ `Inter`（UI）
- **主色**：暗底 `#0D1117`，强调蓝 `#5B8DEF`，JSON 橙 `#F5A623`（关键操作）
- **圆角** 8px，**间距** 8 栅格
- **广告位**：仅首页底部 + 博客页；**工具页不放广告**

---

## 7. 技术栈

| 层 | 选型 |
|----|------|
| 框架 | Nuxt 3（SSG 静态生成，SEO 友好） |
| UI 逻辑 | Vue 3 Composition API + TypeScript |
| 组件库 | Element Plus + TailwindCSS |
| 编辑器 | Monaco Editor（懒加载） |
| i18n | @nuxtjs/i18n（中英双语，hreflang） |
| PWA | @vite-pwa/nuxt（离线可用） |
| 核心 lib | 见功能清单 |
| 部署 | Vercel / Cloudflare Pages |
| 分析 | GA4 + Microsoft Clarity |

---

## 8. 非功能需求

- **性能**：LCP < 2.5s；≥10MB 文件走 Web Worker，不卡 UI
- **隐私**：无任何后端请求，`/privacy` 明确声明
- **兼容**：Chrome/Edge/Firefox/Safari 最新 2 版；移动端 iOS 13+ / Android 8+
- **可访问**：WCAG AA，全键盘可达
- **离线**：PWA 核心工具可离线用

---

## 9. 商业模式

- **MVP**：完全免费
- **后期广告**：仅首页底 + 博客页（工具页保持纯净）
- **未来 Pro（可选）**：历史云端同步、批量、API 接口——不阻塞 MVP

---

## 10. MVP 验收标准

- [ ] 8 个工具全部可用，核心转换结果正确
- [ ] 每工具页 SSG 可抓取，title/description/H1 齐全
- [ ] Lighthouse：SEO > 95，Performance > 90，A11y > 90
- [ ] 中英双语完整切换，hreflang 正确
- [ ] 暗色默认，移动端单栏可用
- [ ] 10MB 文件不卡顿（Web Worker）
- [ ] `/privacy`、`/sitemap.xml`、`/robots.txt` 就位