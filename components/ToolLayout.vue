<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <header class="mb-4">
      <h1 class="text-2xl md:text-3xl font-bold mb-1">{{ title }}</h1>
      <p class="text-gray-500 dark:text-gray-400">{{ description }}</p>
    </header>

    <div class="grid md:grid-cols-2 gap-4">
      <div class="h-[60vh] md:h-[65vh]">
        <slot name="input" />
      </div>
      <div class="h-[60vh] md:h-[65vh]">
        <slot name="output" />
      </div>
    </div>

    <slot name="status" />

    <section v-if="related.length" class="mt-8">
      <h2 class="text-lg font-semibold mb-3">相关工具</h2>
      <div class="flex flex-wrap gap-2">
        <NuxtLink v-for="r in related" :key="r.id" :to="r.path"
          class="px-3 py-1.5 rounded-lg border border-jsonborder hover:border-jsonblue hover:text-jsonblue text-sm">
          <Icon :name="r.icon" class="mr-1 inline" />{{ isZh ? r.name : r.nameEn }}
        </NuxtLink>
      </div>
    </section>

    <section v-if="faq?.length" class="mt-8">
      <h2 class="text-lg font-semibold mb-3">常见问题</h2>
      <el-collapse>
        <el-collapse-item v-for="(item, i) in faq" :key="i" :title="item.q" :name="i">
          <p class="text-gray-600 dark:text-gray-300">{{ item.a }}</p>
        </el-collapse-item>
      </el-collapse>
    </section>
  </div>
</template>

<script setup lang="ts">
interface FaqItem { q: string; a: string }
const props = defineProps<{
  toolId: string
  faq?: FaqItem[]
}>()

const { locale } = useI18n()
const { tools } = useTools()
const isZh = computed(() => locale.value === 'zh')

const meta = computed(() => tools.find(t => t.id === props.toolId))
const title = computed(() => meta.value ? (isZh.value ? meta.value.name : meta.value.nameEn) : '')
const description = computed(() => meta.value ? (isZh.value ? meta.value.desc : meta.value.descEn) : '')
const related = computed(() => {
  if (!meta.value) return []
  return tools.filter(t => t.category === meta.value!.category && t.id !== props.toolId && !t.soon).slice(0, 6)
})

useHead(() => ({
  title: `${title.value} - JSONDog`,
  meta: [{ name: 'description', content: description.value }]
}))

if (props.faq?.length) {
  useHead(() => ({
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.faq!.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      })
    }]
  }))
}
</script>