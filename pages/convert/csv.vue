<template>
  <ToolLayout tool-id="csv" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0 flex items-center gap-3">
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="j2c">JSON → CSV</el-radio-button>
            <el-radio-button label="c2j">CSV → JSON</el-radio-button>
          </el-radio-group>
          <el-checkbox v-model="header" size="small">首行表头</el-checkbox>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" :placeholder="mode === 'j2c' ? 'JSON 数组' : 'CSV'" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" :filename="mode === 'j2c' ? 'output.csv' : 'output.json'" />
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
const mode = ref<'j2c' | 'c2j'>('j2c')
const header = ref(true)
const samples = ['[{"name":"Alice","age":30},{"name":"Bob","age":25}]', 'name,age\nAlice,30\nBob,25']

const escapeCsv = (v: any): string => {
  const s = v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const jsonToCsv = (arr: any[], withHeader: boolean): string => {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  const keys = [...new Set(arr.flatMap(o => Object.keys(o)))]
  const lines = arr.map(o => keys.map(k => escapeCsv(o[k])).join(','))
  return withHeader ? [keys.join(','), ...lines].join('\n') : lines.join('\n')
}

const csvToJson = (csv: string, withHeader: boolean): any[] => {
  const rows: string[][] = []
  let cur: string[] = []
  let field = ''
  let inQ = false
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i]
    if (inQ) {
      if (c === '"') { if (csv[i + 1] === '"') { field += '"'; i++ } else inQ = false }
      else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { cur.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (field || cur.length) { cur.push(field); rows.push(cur); cur = []; field = '' }
      if (c === '\r' && csv[i + 1] === '\n') i++
    } else field += c
  }
  if (field || cur.length) { cur.push(field); rows.push(cur) }
  if (!withHeader) return rows.map(r => r.reduce((o, v, i) => (o[`col${i + 1}`] = v, o), {} as Record<string, any>))
  const headers = rows[0] || []
  return rows.slice(1).map(r => headers.reduce((o, k, i) => (o[k] = r[i], o), {} as Record<string, any>))
}

const result = computed(() => {
  if (!input.value) return { ok: true, value: '', error: null as string | null }
  try {
    if (mode.value === 'j2c') {
      const j = parse(input.value)
      if (!j.ok) return { ok: false, value: '', error: j.error }
      if (!Array.isArray(j.value)) return { ok: false, value: '', error: 'JSON 必须是对象数组' }
      return { ok: true, value: jsonToCsv(j.value, header.value), error: null }
    } else {
      return { ok: true, value: JSON.stringify(csvToJson(input.value, header.value), null, 2), error: null }
    }
  } catch (e: any) {
    return { ok: false, value: '', error: e?.message || String(e) }
  }
})
const error = computed(() => result.value.error)
const output = computed(() => result.value.value)
const { stats } = useJsonStats(input)

const faq = [
  { q: 'JSON → CSV 要求什么格式？', a: 'JSON 必须是对象数组，每个对象是一行，键为列名。' },
  { q: '含逗号/引号的值如何处理？', a: '自动用双引号包裹，内部引号转义为两个引号（RFC 4180 标准）。' }
]
</script>
