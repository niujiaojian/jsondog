<template>
  <ToolLayout tool-id="format" :faq="faq">
    <template #input>
      <JsonInput v-model="input" :samples="samples" placeholder='{"key":"value"}' @clear="input = ''" />
    </template>
    <template #output>
      <div class="flex flex-col h-full">
        <div class="flex items-center gap-2 px-3 py-2 border-b border-jsonborder text-sm shrink-0">
          <span>{{ t('tool.indent') }}</span>
          <el-radio-group v-model="indent" size="small">
            <el-radio-button :label="2">2</el-radio-button>
            <el-radio-button :label="4">4</el-radio-button>
            <el-radio-button label="\t">Tab</el-radio-button>
          </el-radio-group>
        </div>
        <div class="flex-1 min-h-0">
          <JsonOutput :value="output" filename="formatted.json" />
        </div>
      </div>
    </template>
    <template #status>
      <ErrorReport :error="error" />
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
import JSON5 from 'json5'
const { t } = useI18n()
const { parse } = useJsonError()

const input = ref('')
const indent = ref<number | string>(2)

const samples = [
  '{"name":"JSONDog","tools":["format","validate"],"count":3}',
  '[1,2,3,{"a":true,"b":null}]',
  '{"nested":{"deep":{"value":42,"list":[1,2,3]}}}'
]

onMounted(() => {
  const home = useState<string | null>('home-input', () => null)
  if (home.value) { input.value = home.value; home.value = null }
})

const parsed = computed(() => parse(input.value))
const output = computed(() => {
  if (!parsed.value.ok) return ''
  try { return JSON.stringify(parsed.value.value, null, indent.value as number) } catch { return '' }
})
const error = computed(() => parsed.value.ok ? null : parsed.value.error!)
const { stats } = useJsonStats(input)

const faq = [
  { q: '支持 JSON5 吗？', a: '支持，允许注释、尾逗号、单引号等扩展语法。' },
  { q: '如何切换缩进？', a: '在输出区顶部选择 2 / 4 / Tab。' },
  { q: '数据会上传吗？', a: '不会，全部在浏览器内完成。' }
]
</script>