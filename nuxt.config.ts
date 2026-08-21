export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/content',

    '@vite-pwa/nuxt',
    'nuxt-icon'
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      gaId: '',
      siteUrl: 'https://jsondog.chatools.cn'
    }
  },
  i18n: {
    langDir: 'i18n/locales',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', iso: 'zh-CN', name: '中文', file: 'zh.json' }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  content: {
    documentDriven: false,
    highlight: { theme: 'github-dark', preload: ['json', 'bash', 'typescript'] }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'JSONDog - JSON 在线工具箱',
      short_name: 'JSONDog',
      description: '专注 JSON 的在线工具集合，纯前端零上传',
      theme_color: '#0D1117',
      background_color: '#0D1117',
      display: 'standalone',
      start_url: '/',
      icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh' },
      title: 'JSONDog · JSON 在线工具箱',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '专注 JSON 的在线工具集合，纯前端、零上传、中英双语。格式化、校验、转换、代码生成、可视化。' },
        { name: 'theme-color', content: '#0D1117' },
        { property: 'og:site_name', content: 'JSONDog' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: [
        '/',
        '/about',
        '/privacy',
        '/changelog',
        '/blog',
        '/cheatsheet',
        '/examples',
        '/format',
        '/minify',
        '/validate',
        '/tree',
        '/editor',
        '/diff',
        '/mock',
        '/flatten',
        '/transform',
        '/visualize',
        '/encode',
        '/codegen/typescript',
        '/codegen/go',
        '/codegen/java',
        '/codegen/csharp',
        '/codegen/python',
        '/codegen/sql',
        '/codegen/mybatis',
        '/en',
        '/en/blog',
        '/en/cheatsheet',
        '/en/examples'
      ]
    }
  }
})
