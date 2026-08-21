<template>
  <ToolLayout tool-id="diff" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full gap-2">
        <div class="flex-1 min-h-0"><JsonInput v-model="a" placeholder="JSON A" /></div>
        <div class="flex-1 min-h-0"><JsonInput v-model="b" placeholder="JSON B" /></div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="result" filename="diff.txt" />
    </template>
    <template #status>
      <ErrorReport :error="error" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
const { parse } = useJsonError()
const a = ref('')
const b = ref('')

const pa = computed(() => parse(a.value))
const pb = computed(() => parse(b.value))
const error = computed(() => pa.value.ok && pb.value.ok ? null : (pa.value.error || pb.value.error || null))

const isObj = (v: any) => v !== null && typeof v === 'object'
const diffValues = (x: any, y: any, path: string, lines: string[]): string[] => {
  if (!isObj(x) || !isObj(y)) {
    if (JSON.stringify(x) !== JSON.stringify(y)) lines.push(`修改 ${path}: ${JSON.stringify(x)} → ${JSON.stringify(y)}`)
    return lines
  }
  const keys = new Set([...Object.keys(x), ...Object.keys(y)])
  for (const k of keys) {
    const p = Array.isArray(x) ? `${path}[${k}]` : `${path}.${k}`
    if (!(k in x)) lines.push(`新增 ${p}: ${JSON.stringify(y[k])}`)
    else if (!(k in y)) lines.push(`删除 ${p}: ${JSON.stringify(x[k])}`)
    else diffValues(x[k], y[k], p, lines)
  }
  return lines
}

const result = computed(() => {
  if (!pa.value.ok || !pb.value.ok) return ''
  const lines = diffValues(pa.value.value, pb.value.value, '$', [])
  return lines.length ? lines.join('\n') : '两段 JSON 完全相同，无差异。'
})

const faq = [
  { q: '对比是基于顺序的吗？', a: '对象按键名比较，不区分顺序；数组按索引比较。' },
  { q: '支持 JSON5 吗？', a: '支持，输入可为 JSON5。' }
]
</script>