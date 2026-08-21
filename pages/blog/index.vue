<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-2">JSON 博客与教程</h1>
      <p class="text-gray-500 dark:text-gray-400">深入 JSON 语法、工具使用、代码生成与最佳实践。共 {{ posts?.length || 0 }} 篇文章。</p>
    </header>

    <div v-if="categories.length" class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="c in ['全部', ...categories]"
        :key="c"
        @click="active = c"
        :class="['px-3 py-1 rounded-full text-sm border', active === c ? 'border-jsonblue text-jsonblue' : 'border-jsonborder text-gray-500']"
      >{{ c }}</button>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <NuxtLink
        v-for="post in filtered"
        :key="post._path"
        :to="post._path"
        class="block rounded-xl border border-jsonborder p-5 hover:border-jsonblue hover:shadow-md transition-all"
      >
        <div class="flex items-center gap-2 mb-2 text-xs text-gray-400">
          <span class="px-2 py-0.5 rounded bg-jsonblue/10 text-jsonblue">{{ post.category }}</span>
          <span>{{ post.date }}</span>
        </div>
        <h2 class="text-lg font-semibold mb-1">{{ post.title }}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ post.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () =>
  queryContent('/blog').sort({ date: -1 }).find()
)

const active = ref('全部')
const categories = computed(() => {
  if (!posts.value) return []
  return [...new Set(posts.value.map((p: any) => p.category))]
})
const filtered = computed(() => {
  if (!posts.value) return []
  if (active.value === '全部') return posts.value
  return posts.value.filter((p: any) => p.category === active.value)
})

useSeo({
  title: 'JSON 博客与教程 - JSONDog',
  description: 'JSON 语法、工具使用、代码生成、最佳实践等深度文章，助你全面掌握 JSON。',
  path: '/blog'
})
</script>