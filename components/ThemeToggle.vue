<template>
  <button class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5" title="切换主题" @click="toggle">
    <Icon :name="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="text-xl" />
  </button>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>