<template>
  <ToolLayout :tool-id="lang" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0 flex flex-wrap items-center gap-3">
          <el-input v-model="rootName" size="small" placeholder="根类名" style="width:140px" />
          <el-radio-group v-model="indent" size="small">
            <el-radio-button :label="2">2 空格</el-radio-button>
            <el-radio-button :label="4">4 空格</el-radio-button>
          </el-radio-group>
          <el-checkbox v-if="needBigInt" v-model="useBigInt" size="small">BigInt/Long</el-checkbox>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" placeholder="JSON 对象或数组" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" :filename="filename" />
    </template>
    <template #status>
      <ErrorReport :error="error" />
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import { codegenLangs } from '~/utils/codegen'

const route = useRoute()
const lang = computed(() => route.params.lang as string)
const cg = computed(() => codegenLangs.find(l => l.id === lang.value))

if (!cg.value) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown codegen language', fatal: true })
}

const { parse } = useJsonError()
const input = ref('')
const rootName = ref('Root')
const indent = ref(2)
const useBigInt = ref(false)

const needBigInt = computed(() => ['java', 'csharp', 'sql'].includes(lang.value))

const samples = [
  '{"id":1,"name":"Alice","age":30,"active":true,"tags":["a","b"],"address":{"city":"NYC","zip":"10001"}}',
  '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]'
]

const parsed = computed(() => parse(input.value))
const error = computed(() => parsed.value.ok ? null : parsed.value.error!)

const output = computed(() => {
  if (!parsed.value.ok) return ''
  try {
    return cg.value!.gen(parsed.value.value, {
      rootName: rootName.value || 'Root',
      indent: indent.value,
      useBigInt: useBigInt.value
    })
  } catch (e: any) {
    return `// 生成失败: ${e?.message || e}`
  }
})

const filename = computed(() => `result.${cg.value!.ext}`)
const { stats } = useJsonStats(input)

const faqByLang: Record<string, Array<{ q: string; a: string }>> = {
  typescript: [
    { q: '数组类型如何推断？', a: '取数组第一个元素的类型，生成 T[]。' },
    { q: '嵌套对象会生成独立 interface 吗？', a: '会，每个嵌套对象生成独立 interface 并去重。' }
  ],
  java: [
    { q: '生成的是 POJO 吗？', a: '是，含 private 字段 + getter/setter。' },
    { q: '整数用 Integer 还是 Long？', a: '勾选 BigInt/Long 用 Long，否则 Integer。' }
  ],
  go: [
    { q: 'struct tag 是什么格式？', a: 'json:"字段名"，与原始 JSON key 对应。' }
  ],
  python: [
    { q: '生成什么风格？', a: 'dataclass，含类型注解。' }
  ],
  csharp: [
    { q: '属性风格？', a: 'auto-property: public T Name { get; set; }' }
  ],
  sql: [
    { q: '表名和列名规则？', a: '统一转 snake_case。' },
    { q: '嵌套对象/数组列类型？', a: '默认 JSON 类型，可视为 TEXT。' }
  ],
  mybatis: [
    { q: '生成哪些 SQL？', a: 'resultMap + selectById/selectAll/insert/update/deleteById。' },
    { q: 'namespace 规则？', a: 'com.example.{EntityName}Mapper。' }
  ]
}
const faq = computed(() => faqByLang[lang.value] || [])
</script>