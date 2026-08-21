<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-4">关于 JSONDog</h1>
    <div class="prose dark:prose-invert max-w-none">
      <p>JSONDog 是一个<strong>专注 JSON</strong>的在线工具集合站，只做 JSON，不做其他。</p>
      <h2>定位</h2>
      <p>面向开发者与数据处理人员，提供格式化、校验、转换、代码生成、可视化等全套 JSON 工具。</p>
      <h2>特点</h2>
      <ul>
        <li><strong>纯前端</strong>：所有运算在浏览器内完成，数据永不上传。</li>
        <li><strong>零依赖</strong>：无需注册、无使用限制。</li>
        <li><strong>中英双语</strong>：支持中文与英文界面切换。</li>
        <li><strong>开源</strong>：代码托管于 GitHub，欢迎贡献。</li>
      </ul>
      <h2>技术栈</h2>
      <p>Nuxt 3 + Vue 3 + TypeScript + Element Plus + TailwindCSS。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: '关于 - JSONDog', meta: [{ name: 'description', content: 'JSONDog 是专注 JSON 的在线工具集合，纯前端、零上传、开源。' }] })
</script>