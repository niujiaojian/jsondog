<template>
  <ToolLayout tool-id="validate" :faq="faq">
    <template #input>
      <JsonInput v-model="input" :samples="samples" placeholder='{"key":"value"}' @clear="input = ''" />
    </template>
    <template #output>
      <div class="h-full rounded-lg border border-jsonborder bg-white dark:bg-jsonpanel overflow-auto p-4">
        <template v-if="!input.trim()">
          <p class="text-gray-400 text-center mt-20">粘贴 JSON 以开始校验</p>
        </template>
        <template v-else-if="parsed.ok">
          <div class="flex items-center gap-2 text-green-500 mb-3">
            <Icon name="mdi:check-circle" class="text-2xl" />
            <span class="font-semibold">JSON 合法</span>
          </div>
          <pre class="font-mono text-sm text-gray-700 dark:text-gray-300"><code>{{ pretty }}</code></pre>
        </template>
        <template v-else>
          <ErrorReport :error="parsed.error!" />
        </template>
      </div>
    </template>
    <template #status>
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
const { parse } = useJsonError()

const input = ref('')
const samples = [
  '{"valid":true}',
  '{"bad": "missing quote}',
  '{"dup":1,"dup":2}'
]

const parsed = computed(() => parse(input.value))
const pretty = computed(() => {
  if (!parsed.value.ok) return ''
  try { return JSON.stringify(parsed.value.value, null, 2) } catch { return '' }
})
const { stats } = useJsonStats(input)

const faq = [
  { q: '校验用什么标准？', a: '默认支持 JSON5（兼容标准 JSON），允许注释与尾逗号。' },
  { q: '错误如何定位？', a: '会显示错误所在的行号、列号与修复建议。' }
]
</script>