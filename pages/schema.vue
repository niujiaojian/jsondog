<template>
  <ToolLayout tool-id="schema" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0">
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="gen">生成 Schema</el-radio-button>
            <el-radio-button label="validate">校验</el-radio-button>
          </el-radio-group>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" placeholder="JSON" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <div v-if="mode === 'gen'" class="h-full">
        <JsonOutput :value="output" filename="schema.json" />
      </div>
      <div v-else class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0 text-sm text-gray-500">输入 JSON Schema</div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="schemaInput" :samples="schemaSamples" placeholder="JSON Schema" @clear="schemaInput = ''" />
        </div>
      </div>
    </template>
    <template #status>
      <ErrorReport :error="error" />
      <div v-if="mode === 'validate' && validateResult" class="px-3 py-2 text-sm border-t border-jsonborder">
        <div v-if="validateResult.valid" class="text-green-600 dark:text-green-400">✓ 校验通过</div>
        <div v-else class="text-red-600 dark:text-red-400">✗ {{ validateResult.errors.length }} 个错误：
          <ul class="mt-1 ml-4 list-disc">
            <li v-for="(e, i) in validateResult.errors" :key="i" class="font-mono text-xs">{{ e }}</li>
          </ul>
        </div>
      </div>
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
const { parse } = useJsonError()
const input = ref('')
const schemaInput = ref('')
const mode = ref<'gen' | 'validate'>('gen')
const samples = ['{"name":"Alice","age":30,"email":"a@b.com"}']
const schemaSamples = ['{"type":"object","properties":{"name":{"type":"string"},"age":{"type":"integer"}},"required":["name","age"]}']

const inferSchema = (v: any): any => {
  if (v === null) return { type: 'null' }
  if (typeof v === 'string') return { type: 'string' }
  if (typeof v === 'number') return { type: Number.isInteger(v) ? 'integer' : 'number' }
  if (typeof v === 'boolean') return { type: 'boolean' }
  if (Array.isArray(v)) {
    if (v.length === 0) return { type: 'array' }
    return { type: 'array', items: inferSchema(v[0]) }
  }
  const props: Record<string, any> = {}
  const required: string[] = []
  for (const [k, val] of Object.entries(v)) {
    props[k] = inferSchema(val)
    required.push(k)
  }
  return { type: 'object', properties: props, required }
}

const error = ref<string | null>(null)
const output = computed(() => {
  error.value = null
  if (!input.value) return ''
  const j = parse(input.value)
  if (!j.ok) { error.value = j.error; return '' }
  return JSON.stringify(inferSchema(j.value), null, 2)
})

const validateResult = ref<{ valid: boolean; errors: string[] } | null>(null)
watch([input, schemaInput, mode], () => {
  validateResult.value = null
  if (mode.value !== 'validate' || !input.value || !schemaInput.value) return
  try {
    const data = parse(input.value)
    if (!data.ok) { error.value = data.error; return }
    const schema = parse(schemaInput.value)
    if (!schema.ok) { error.value = 'Schema: ' + schema.error; return }
    const ajv = new Ajv({ allErrors: true, strict: false })
    addFormats(ajv)
    const valid = ajv.validate(schema.value, data.value) as boolean
    validateResult.value = {
      valid,
      errors: valid ? [] : (ajv.errors || []).map(e => `${e.instancePath || '/'}: ${e.message}`)
    }
    error.value = null
  } catch (e: any) {
    error.value = e?.message || String(e)
  }
})

const { stats } = useJsonStats(input)

const faq = [
  { q: '生成 Schema 的类型推断规则？', a: '字符串/数字/布尔/null 直接映射，数组取首元素推断 items，对象递归 properties。' },
  { q: '校验支持哪个 Draft？', a: 'Ajv 默认 Draft-07，支持 formats（email/uri/date 等）。' }
]
</script>