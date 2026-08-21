# JSONDog · JSON 在线工具箱

> 专注 JSON 的在线工具集合，纯前端、零上传、中英双语、开源。

网站：https://jsondog.chatools.cn

## 功能

### 核心工具
- **JSON 格式化** — 美化、缩进，支持 2/4/Tab 空格
- **JSON 压缩** — 去除空白，压缩为单行
- **JSON 校验** — 语法检查，报告错误行号与修复建议
- **JSON 树查看器** — 可折叠树形查看，支持搜索与路径复制
- **JSON 编辑器** — 语法高亮、行号、实时校验

### 代码生成
- JSON → TypeScript interface
- JSON → Go struct
- JSON → Java POJO
- JSON → C# class
- JSON → Python dataclass
- JSON → SQL CREATE TABLE
- JSON → MyBatis Mapper XML

### 高级工具
- **JSON 对比** — 对比两段 JSON 的差异
- **JSON Mock 生成** — 按样本结构生成随机假数据
- **JSON 扁平化** — 嵌套对象扁平化与反扁平化
- **JSON 键排序** — 按键名升序或降序递归排序
- **JSON 可视化** — 统计键数、类型分布、嵌套深度
- **JSON 编解码** — Base64 与 URL 编码解码

### 内容区
- **博客** — 60+ 篇 JSON 教程与最佳实践（SEO）
- **速查表** — JSON 语法速查
- **示例库** — 常用 JSON 示例

## 特性

- **纯前端零后端** — 数据不离开浏览器，隐私安全
- **中英双语** — 完整 i18n 支持
- **暗色模式** — 默认暗色，护眼
- **PWA** — 可离线使用
- **SEO** — SSG 预渲染、sitemap、结构化数据
- **JSON5** — 容错解析，支持注释/尾逗号

## 技术栈

- [Nuxt 3](https://nuxt.com) (SSG) + [Vue 3](https://vuejs.org) Composition API
- [TypeScript](https://www.typescriptlang.org)
- [Element Plus](https://element-plus.org) + [Tailwind CSS](https://tailwindcss.com)
- [@nuxt/content](https://content.nuxt.com) 博客
- [JSON5](https://json5.org) 容错解析
- [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app) PWA

## 开发

```bash
# 安装依赖（推荐 npm，pnpm 在 Windows 有 native binding 问题）
npm install

# 开发模式
npm run dev

# 生产构建（含 sitemap 生成 + 资产复制）
npm run build

# 预览构建产物
npm run preview
```

## 部署

本项目为纯静态站点，部署到 Vercel：

```bash
# vercel.json 已配置：
#   buildCommand: npm run build
#   outputDirectory: .output/public
```

也可部署到任何静态托管（Cloudflare Pages / Netlify / GitHub Pages），输出目录为 `.output/public`。

## 项目结构

```
├── components/       # 通用组件（ToolLayout/JsonInput/JsonOutput 等）
├── composables/      # 组合式函数（useTools/useTheme/useJsonError 等）
├── pages/            # 页面路由
│   ├── codegen/      # 代码生成工具（动态路由 [lang].vue）
│   ├── blog/         # 博客
│   └── *.vue         # 各工具页
├── content/blog/     # 60+ 篇 Markdown 博客文章
├── utils/codegen.ts  # 代码生成核心逻辑（7 种语言）
├── scripts/          # 构建脚本（sitemap 生成 + 资产复制）
└── docs/             # 设计文档（PRD/WBS/线框图）
```

## 开源协议

MIT