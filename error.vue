<template>
  <div class="min-h-screen flex items-center justify-center bg-jsonbg text-gray-200 p-8">
    <div class="max-w-md text-center">
      <p class="text-6xl font-bold text-jsonorange mb-4">{{ error?.statusCode || 500 }}</p>
      <h1 class="text-2xl font-semibold mb-2">{{ message }}</h1>
      <p class="text-gray-400 mb-6">JSONDog · JSON 在线工具箱</p>
      <NuxtLink to="/" class="inline-block px-5 py-2 rounded-lg bg-jsonblue text-white hover:opacity-90">
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number } }>()
const message = computed(() => {
  if (props.error?.statusCode === 404) return '页面不存在'
  return '出错了'
})
</script>