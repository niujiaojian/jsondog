<template>
  <ToolLayout tool-id="yaml" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0">
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="j2y">JSON → YAML</el-radio-button>
            <el-radio-button label="y2j">YAML → JSON</el-radio-button>
          </el-radio-group>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" :placeholder="mode === 'j2y' ? 'JSON' : 'YAML'" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" :filename="mode === 'j2y' ? 'output.yaml' : 'output.json'" />
    </template>
    <template #status>
      <ErrorReport :error="error" />
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { dump as yamlDump, load as yamlLoad } from 'js-yaml'
const { parse } = useJsonError()
const input = ref('')
const mode = ref<'j2y' | 'y2j'>('j2y')
const samples = ['{"name":"Alice","age":30,"active":true,"tags":["a","b"]}', 'name: Alice\nage: 30\nactive: true\ntags:\n  - a\n  - b']

const result = computed(() => {
  if (!input.value) return { ok: true, value: '', error: null as string | null }
  try {
    if (mode.value === 'j2y') {
      const j = parse(input.value)
      if (!j.ok) return { ok: false, value: '', error: j.error }
      return { ok: true, value: yamlDump(j.value, { indent: 2, lineWidth: -1 }), error: null }
    } else {
      const j = yamlLoad(input.value)
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
  { q: '支持 YAML 哪些特性？', a: '支持多行字符串、锚点、别名等 js-yaml 的全部特性。' },
  { q: 'YAML → JSON 类型保留？', a: '会，YAML 的字符串/数字/布尔/null 正确映射到 JSON 类型。' }
]
</script>