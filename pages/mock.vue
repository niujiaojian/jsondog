<template>
  <ToolLayout tool-id="mock" :faq="faq">
    <template #input>
      <JsonInput v-model="input" :samples="samples" placeholder="粘贴 JSON 样本结构" @clear="input = ''" />
    </template>
    <template #output>
      <JsonOutput :value="output" filename="mock.json" />
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
  '{"name":"x","age":20,"tags":["a","b"],"active":true}',
  '{"id":1,"user":{"name":"x","email":"y@z.com"},"roles":["admin"]}'
]

const parsed = computed(() => parse(input.value))
const error = computed(() => parsed.value.ok ? null : parsed.value.error!)

const mockValue = (v: any): any => {
  if (typeof v === 'string') return 'mock_' + Math.random().toString(36).slice(2, 8)
  if (typeof v === 'number') return Math.floor(Math.random() * 1000)
  if (typeof v === 'boolean') return Math.random() > 0.5
  if (v === null) return null
  if (Array.isArray(v)) return v.map(mockValue)
  if (typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, mockValue(val)]))
  return v
}

const output = computed(() => parsed.value.ok ? JSON.stringify(mockValue(parsed.value.value), null, 2) : '')
const { stats } = useJsonStats(input)

const faq = [
  { q: 'Mock 数据的规则是什么？', a: '保留原结构与类型：字符串生成随机串，数字生成随机数，布尔随机真假，null 保持。' },
  { q: '每次结果一样吗？', a: '不一样，每次执行都重新随机生成。' }
]
</script>