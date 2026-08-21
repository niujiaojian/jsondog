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
      <ErrorReport :error="error" />
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

const result = computed(() => {
  if (!input.value || !expr.value) return { ok: true, value: '', error: null as string | null }
  try {
    const j = parse(input.value)
    if (!j.ok) return { ok: false, value: '', error: j.error }
    const res = JSONPath.JSONPath({ path: expr.value, json: j.value })
    return { ok: true, value: JSON.stringify(res, null, 2), error: null }
  } catch (e: any) {
    return { ok: false, value: '', error: e?.message || String(e) }
  }
})
const error = computed(() => result.value.error)
const output = computed(() => result.value.value)
const { stats } = useJsonStats(input)

const faq = [
  { q: '支持哪些 JSONPath 语法？', a: '支持 $（根）、..（递归）、*（通配）、[?()]（过滤）等 jsonpath-plus 全部语法。' },
  { q: '过滤表达式怎么写？', a: '如 $..book[?(@.price<30)]，@ 表示当前元素。' }
]
</script>