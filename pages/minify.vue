<template>
  <ToolLayout tool-id="minify" :faq="faq">
    <template #input>
      <JsonInput v-model="input" :samples="samples" placeholder='{"key":"value"}' @clear="input = ''" />
    </template>
    <template #output>
      <JsonOutput :value="output" filename="minified.json" />
    </template>
    <template #status>
      <ErrorReport :error="error" />
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
const { parse } = useJsonError()

const input = ref('')
const samples = [
  '{\n  "a": 1,\n  "b": 2\n}',
  '[\n  1,\n  2,\n  3\n]',
  '{"name":"JSONDog","version":"0.1.0"}'
]

const parsed = computed(() => parse(input.value))
const output = computed(() => {
  if (!parsed.value.ok) return ''
  try { return JSON.stringify(parsed.value.value) } catch { return '' }
})
const error = computed(() => parsed.value.ok ? null : parsed.value.error!)
const { stats } = useJsonStats(input)

const faq = [
  { q: '压缩后会改变数据吗？', a: '不会，仅去除空白与换行，数据内容完全一致。' },
  { q: '支持 JSON5 吗？', a: '支持，输入可为 JSON5，输出为标准 JSON。' }
]
</script>