<template>
  <ToolLayout tool-id="transform" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0">
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="asc">键名升序</el-radio-button>
            <el-radio-button label="desc">键名降序</el-radio-button>
          </el-radio-group>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" placeholder="JSON" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" filename="transformed.json" />
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
const mode = ref<'asc' | 'desc'>('asc')
const samples = ['{"z":1,"a":2,"m":{"y":1,"b":2}}', '{"banana":3,"apple":1,"cherry":2}']

const parsed = computed(() => parse(input.value))
const error = computed(() => parsed.value.ok ? null : parsed.value.error!)

const sortKeys = (v: any): any => {
  if (Array.isArray(v)) return v.map(sortKeys)
  if (v !== null && typeof v === 'object') {
    const entries = Object.entries(v).sort(([a], [b]) =>
      mode.value === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    )
    return Object.fromEntries(entries.map(([k, val]) => [k, sortKeys(val)]))
  }
  return v
}

const output = computed(() => parsed.value.ok ? JSON.stringify(sortKeys(parsed.value.value), null, 2) : '')
const { stats } = useJsonStats(input)

const faq = [
  { q: '排序是递归的吗？', a: '是，所有层级的对象键都会被排序，数组顺序保持不变。' },
  { q: '支持中文键名排序吗？', a: '支持，使用 localeCompare 按本地化规则排序。' }
]
</script>