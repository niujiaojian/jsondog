<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    <template v-for="tool in list" :key="tool.id">
      <div v-if="tool.soon" class="group rounded-xl border border-jsonborder opacity-50 p-4">
        <Icon :name="tool.icon" class="text-2xl text-jsonblue mb-2" />
        <p class="font-semibold">{{ isZh ? tool.name : tool.nameEn }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{{ isZh ? tool.desc : tool.descEn }}</p>
        <span class="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-white/10">即将上线</span>
      </div>
      <NuxtLink v-else :to="tool.path" class="group rounded-xl border border-jsonborder hover:border-jsonblue hover:shadow-md p-4 transition-all">
        <Icon :name="tool.icon" class="text-2xl text-jsonblue mb-2" />
        <p class="font-semibold">{{ isZh ? tool.name : tool.nameEn }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{{ isZh ? tool.desc : tool.descEn }}</p>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const props = defineProps<{ tools: ToolMeta[] }>()
const isZh = computed(() => locale.value === 'zh')
const list = computed(() => props.tools)
</script>