<template>
  <article v-if="post" class="max-w-3xl mx-auto px-4 py-10">
    <NuxtLink to="/blog" class="text-sm text-jsonblue mb-4 inline-block">← 返回博客</NuxtLink>
    <div class="flex items-center gap-2 mb-3 text-xs text-gray-400">
      <span class="px-2 py-0.5 rounded bg-jsonblue/10 text-jsonblue">{{ post.category }}</span>
      <span>{{ post.date }}</span>
    </div>
    <h1 class="text-3xl font-bold mb-6">{{ post.title }}</h1>
    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="post" />
    </div>

    <section v-if="related.length" class="mt-10 border-t border-jsonborder pt-6">
      <h2 class="text-lg font-semibold mb-3">相关文章</h2>
      <div class="grid sm:grid-cols-2 gap-3">
        <NuxtLink v-for="r in related" :key="r._path" :to="r._path" class="block p-3 rounded-lg border border-jsonborder hover:border-jsonblue">
          <p class="font-medium text-sm">{{ r.title }}</p>
        </NuxtLink>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`post-${route.path}`, () =>
  queryContent(route.path).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在' })
}

const { data: related } = await useAsyncData(`related-${route.path}`, () =>
  queryContent('/blog')
    .where({ _path: { $ne: route.path }, category: (post.value as any).category })
    .limit(4)
    .find()
)

useSeo({
  title: `${(post.value as any).title} - JSONDog`,
  description: (post.value as any).description,
  path: route.path
})
</script>