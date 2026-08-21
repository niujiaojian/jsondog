<template>
  <ToolLayout tool-id="visualize" :faq="faq">
    <template #input>
      <JsonInput v-model="input" :samples="samples" placeholder="粘贴 JSON 以分析结构" @clear="input = ''" />
    </template>
    <template #output>
      <div class="h-full rounded-lg border border-jsonborder bg-white dark:bg-jsonpanel overflow-auto p-4">
        <template v-if="!parsed.ok">
          <p class="text-gray-400 text-center mt-20">请输入合法 JSON</p>
        </template>
        <template v-else>
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div class="text-center p-3 rounded-lg bg-gray-100 dark:bg-white/5">
              <p class="text-2xl font-bold text-jsonblue">{{ analysis.totalKeys }}</p>
              <p class="text-xs text-gray-400">总键数</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-100 dark:bg-white/5">
              <p class="text-2xl font-bold text-jsonorange">{{ analysis.maxDepth }}</p>
              <p class="text-xs text-gray-400">最大深度</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-gray-100 dark:bg-white/5">
              <p class="text-2xl font-bold text-green-500">{{ analysis.totalValues }}</p>
              <p class="text-xs text-gray-400">值总数</p>
            </div>
          </div>

          <h3 class="font-semibold mb-2">值类型分布</h3>
          <div class="space-y-2 mb-6">
            <div v-for="t in typeRows" :key="t.name" class="flex items-center gap-2 text-sm">
              <span class="w-16 text-gray-500">{{ t.name }}</span>
              <div class="flex-1 bg-gray-200 dark:bg-white/10 rounded h-5 overflow-hidden">
                <div class="h-full bg-jsonblue" :style="{ width: t.percent + '%' }"></div>
              </div>
              <span class="w-20 text-right font-mono">{{ t.count }}</span>
            </div>
          </div>

          <h3 class="font-semibold mb-2">高频键名 Top 10</h3>
          <div class="space-y-1 text-sm">
            <div v-for="k in topKeys" :key="k.name" class="flex justify-between">
              <span class="font-mono text-jsonblue">{{ k.name }}</span>
              <span class="text-gray-400">{{ k.count }}</span>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template #status>
      <ErrorReport :error="parsed.ok ? null : parsed.error!" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
const { parse } = useJsonError()
const input = ref('')
const samples = [
  '{"users":[{"name":"a","age":1},{"name":"b","age":2}],"total":2}',
  '{"a":{"b":{"c":1}},"x":{"y":2}}'
]

const parsed = computed(() => parse(input.value))

const analysis = computed(() => {
  const types: Record<string, number> = { string: 0, number: 0, boolean: 0, null: 0, object: 0, array: 0 }
  const keyCount: Record<string, number> = {}
  let maxDepth = 0, totalKeys = 0, totalValues = 0
  if (parsed.value.ok) {
    const walk = (v: any, depth: number) => {
      maxDepth = Math.max(maxDepth, depth)
      if (v === null) { types.null++; totalValues++ }
      else if (typeof v === 'string') { types.string++; totalValues++ }
      else if (typeof v === 'number') { types.number++; totalValues++ }
      else if (typeof v === 'boolean') { types.boolean++; totalValues++ }
      else if (Array.isArray(v)) { types.array++; v.forEach((x) => walk(x, depth + 1)) }
      else if (typeof v === 'object') {
        types.object++
        for (const [k, val] of Object.entries(v)) {
          totalKeys++
          keyCount[k] = (keyCount[k] || 0) + 1
          walk(val, depth + 1)
        }
      }
    }
    walk(parsed.value.value, 0)
  }
  return { types, keyCount, maxDepth, totalKeys, totalValues }
})

const typeRows = computed(() => {
  const t = analysis.value.types
  const total = Object.values(t).reduce((s, n) => s + n, 0) || 1
  return Object.entries(t).map(([name, count]) => ({ name, count, percent: Math.round((count / total) * 100) }))
})

const topKeys = computed(() => {
  return Object.entries(analysis.value.keyCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }))
})

const faq = [
  { q: '分析包含哪些指标？', a: '总键数、最大嵌套深度、值总数、各类型分布、高频键名。' },
  { q: '大对象会卡吗？', a: '常规规模无压力，超大型对象建议先用格式化工具预处理。' }
]
</script>