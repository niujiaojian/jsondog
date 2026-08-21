<template>
  <ToolLayout tool-id="jsonpath" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0 space-y-2">
          <el-input v-model="expr" size="small" placeholder="$.store.book[*].author" />
          <div class="flex flex-wrap gap-1">
            <el-button v-for="ex in examples" :key="ex" size="small" text @click="expr = ex">{{ ex }}</el-button>
          </div>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" placeholder="JSON" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" filename="result.json" />
    </template>
    <template #status>
      <ErrorReport :error="jsonError" />
      <div v-if="queryError" class="mt-3 rounded-lg border border-orange-400/40 bg-orange-50 dark:bg-orange-900/20 p-4">
        <div class="flex items-start gap-2">
          <Icon name="mdi:alert-circle-outline" class="text-orange-500 text-xl shrink-0 mt-0.5" />
          <div class="text-sm">
            <p class="font-semibold text-orange-600 dark:text-orange-400">查询表达式错误</p>
            <p class="mt-1 text-gray-700 dark:text-gray-300 font-mono text-xs">{{ queryError }}</p>
          </div>
        </div>
      </div>
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { JSONPath } from 'jsonpath-plus'
const { parse } = useJsonError()
const input = ref('')
const expr = ref('$..author')
const examples = ['$.store.book[*].author', '$..author', '$.store.*', '$..book[?(@.price<30)]', '$.store.book[0].title']
const samples = ['{"store":{"book":[{"title":"A","price":25},{"title":"B","price":35}],"bicycle":{"color":"red","price":20}}}']

const jsonError = computed(() => {
  if (!input.value.trim()) return null
  const j = parse(input.value)
  return j.ok ? null : j.error
})

const result = computed(() => {
  if (!input.value || !expr.value) return { value: '', queryError: null as string | null }
  const j = parse(input.value)
  if (!j.ok) return { value: '', queryError: null }
  try {
    const res = JSONPath.JSONPath({ path: expr.value, json: j.value })
    return { value: JSON.stringify(res, null, 2), queryError: null }
  } catch (e: any) {
    return { value: '', queryError: e?.message || String(e) }
  }
})
const output = computed(() => result.value.value)
const queryError = computed(() => result.value.queryError)
const { stats } = useJsonStats(input)

const faq = [
  { q: '支持哪些 JSONPath 语法？', a: '支持 $（根）、..（递归）、*（通配）、[?()]（过滤）等 jsonpath-plus 全部语法。' },
  { q: '过滤表达式怎么写？', a: '如 $..book[?(@.price<30)]，@ 表示当前元素。' }
]
</script>