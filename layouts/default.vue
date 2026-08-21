<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-jsonbg text-gray-800 dark:text-gray-200 transition-colors">
    <AppHeader />
    <main class="flex-1 w-full">
      <slot />
    </main>
    <footer class="border-t border-jsonborder py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {{ year }} JSONDog · 专注 JSON 的在线工具箱</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/about" class="hover:text-jsonblue">关于</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-jsonblue">隐私</NuxtLink>
          <NuxtLink to="/changelog" class="hover:text-jsonblue">更新日志</NuxtLink>
          <a href="https://bing.chatools.cn" target="_blank" rel="noopener" class="hover:text-jsonblue">每日一图</a>
          <a href="https://github.com" target="_blank" class="hover:text-jsonblue">GitHub</a>
        </div>
      </div>
    </footer>
    <CommandPalette />
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>