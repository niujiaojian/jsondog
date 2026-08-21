<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold mb-6">更新日志</h1>
    <div class="space-y-6">
      <div v-for="log in logs" :key="log.version" class="border-l-2 border-jsonblue pl-4">
        <h2 class="text-xl font-semibold">{{ log.version }}</h2>
        <p class="text-sm text-gray-500 mb-2">{{ log.date }}</p>
        <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li v-for="item in log.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const logs = [
  { version: 'v0.1.0', date: '2026-08-19', items: ['初始版本', 'JSON 格式化 / 压缩 / 校验', 'JSON 树形查看器', 'JSON 编辑器（语法高亮 + 实时校验）', '中英双语、暗色模式、工具搜索（Ctrl+K）'] }
]
useHead({ title: '更新日志 - JSONDog' })
</script>