<template>
  <ToolLayout tool-id="xml" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0">
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="j2x">JSON → XML</el-radio-button>
            <el-radio-button label="x2j">XML → JSON</el-radio-button>
          </el-radio-group>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" :placeholder="mode === 'j2x' ? 'JSON' : 'XML'" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" :filename="mode === 'j2x' ? 'output.xml' : 'output.json'" />
    </template>
    <template #status>
      <ErrorReport :error="error" />
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
const { parse } = useJsonError()
const input = ref('')
const mode = ref<'j2x' | 'x2j'>('j2x')
const samples = ['{"root":{"name":"Alice","age":30}}', '<root>\n  <name>Alice</name>\n  <age>30</age>\n</root>']

const builder = new XMLBuilder({ format: true, indentBy: '  ' })
const parser = new XMLParser()

const result = computed(() => {
  if (!input.value) return { ok: true, value: '', error: null as string | null }
  try {
    if (mode.value === 'j2x') {
      const j = parse(input.value)
      if (!j.ok) return { ok: false, value: '', error: j.error }
      return { ok: true, value: builder.build(j.value), error: null }
    } else {
      const j = parser.parse(input.value)
      return { ok: true, value: JSON.stringify(j, null, 2), error: null }
    }
  } catch (e: any) {
    return { ok: false, value: '', error: e?.message || String(e) }
  }
})
const error = computed(() => result.value.error)
const output = computed(() => result.value.value)
const { stats } = useJsonStats(input)

const faq = [
  { q: 'JSON → XML 需要根元素吗？', a: '需要，XML 必须有单一根元素，JSON 顶层应是对象。' },
  { q: '数组如何转 XML？', a: '数组元素以父键名为标签名重复输出。' }
]
</script>