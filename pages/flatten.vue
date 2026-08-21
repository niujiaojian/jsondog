<template>
  <ToolLayout tool-id="flatten" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0">
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="flatten">扁平化</el-radio-button>
            <el-radio-button label="unflatten">反扁平化</el-radio-button>
          </el-radio-group>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" placeholder="JSON 对象" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" filename="flattened.json" />
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
const mode = ref<'flatten' | 'unflatten'>('flatten')
const samples = ['{"a":{"b":{"c":1}},"d":2}', '{"user.name":"x","user.age":20,"id":1}']

const parsed = computed(() => parse(input.value))
const error = computed(() => parsed.value.ok ? null : parsed.value.error!)

const flatten = (obj: Record<string, any>, prefix = '', out: Record<string, any> = {}): Record<string, any> => {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out)
    else out[key] = v
  }
  return out
}

const unflatten = (obj: Record<string, any>): Record<string, any> => {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    const parts = k.split('.')
    let cur = out
    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i]] = cur[parts[i]] || {}
      cur = cur[parts[i]]
    }
    cur[parts[parts.length - 1]] = v
  }
  return out
}

const output = computed(() => {
  if (!parsed.value.ok || typeof parsed.value.value !== 'object') return ''
  const obj = parsed.value.value as Record<string, any>
  const res = mode.value === 'flatten' ? flatten(obj) : unflatten(obj)
  return JSON.stringify(res, null, 2)
})

const { stats } = useJsonStats(input)

const faq = [
  { q: '扁平化的路径分隔符是什么？', a: '使用点号 . 分隔层级，如 a.b.c。' },
  { q: '数组会被扁平化吗？', a: '不会，数组作为整体保留在对应路径。' }
]
</script>