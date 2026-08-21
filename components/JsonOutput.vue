<template>
  <div class="flex flex-col h-full rounded-lg border border-jsonborder bg-white dark:bg-jsonpanel overflow-hidden">
    <div class="flex items-center gap-2 px-3 py-2 border-b border-jsonborder shrink-0">
      <span class="text-sm font-medium">{{ t('tool.output') }}</span>
      <div class="ml-auto flex items-center gap-1">
        <el-button size="small" @click="copy"><Icon name="mdi:content-copy" class="mr-1" />{{ t('tool.copy') }}</el-button>
        <el-button size="small" @click="download"><Icon name="mdi:download" /></el-button>
      </div>
    </div>
    <pre class="flex-1 overflow-auto p-3 font-mono text-sm leading-relaxed"><code v-html="highlighted" /></pre>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const props = defineProps<{
  value: string
  filename?: string
}>()

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const highlighted = computed(() => {
  const raw = props.value ?? ''
  if (!raw) return ''
  const escaped = escapeHtml(raw)
  return escaped.replace(
    /("(?:\\.|[^"\\])*"\s*:?)|(\b(?:true|false|null)\b)|(-?\d+\.?\d*(?:e[+-]?\d+)?)/gi,
    (m, str, kw, num) => {
      if (str) return `<span class="text-green-500">${str}</span>`
      if (kw) return `<span class="text-jsonorange">${kw}</span>`
      if (num) return `<span class="text-jsonblue">${num}</span>`
      return m
    }
  )
})

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.value)
    ElMessage.success(t('tool.copied'))
  } catch { /* ignore */ }
}

const download = () => {
  const blob = new Blob([props.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = props.filename || 'result.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>