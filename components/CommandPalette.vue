<template>
  <el-dialog v-model="open" :title="isZh ? '搜索工具' : 'Search tools'" width="520px" :show-close="true">
    <el-input v-model="query" :placeholder="isZh ? '输入工具名或关键词...' : 'Type tool name or keyword...'" autofocus>
      <template #prefix><Icon name="mdi:magnify" /></template>
    </el-input>
    <div class="mt-3 max-h-80 overflow-auto">
      <button v-for="tool in filtered" :key="tool.id" @click="go(tool.path)"
        class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2">
        <Icon :name="tool.icon" class="text-jsonblue" />
        <span class="font-medium">{{ isZh ? tool.name : tool.nameEn }}</span>
        <span class="text-xs text-gray-400 ml-auto">{{ isZh ? tool.desc : tool.descEn }}</span>
      </button>
      <p v-if="!filtered.length" class="text-center text-gray-400 py-6">无匹配工具</p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { tools } = useTools()
const isZh = computed(() => locale.value === 'zh')

const open = useState<boolean>('palette-open', () => false)
const query = ref('')

const filtered = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return tools.filter(t => !t.soon)
  return tools.filter(t => {
    const hay = `${t.name} ${t.nameEn} ${t.desc} ${t.descEn}`.toLowerCase()
    return hay.includes(q)
  })
})

const go = (path: string) => {
  open.value = false
  query.value = ''
  navigateTo(path)
}
</script>