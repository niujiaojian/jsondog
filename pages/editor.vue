<template>
  <ToolLayout tool-id="editor" :faq="faq">
    <template #input>
      <JsonInput v-model="input" :samples="samples" placeholder='在此编辑 JSON...' @clear="input = ''" />
    </template>
    <template #output>
      <JsonOutput :value="input" filename="edited.json" />
    </template>
    <template #status>
      <ErrorReport :error="error" />
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
const { parse } = useJsonError()

const input = ref('{\n  "name": "JSONDog",\n  "tools": [\n    "format",\n    "validate"\n  ]\n}')
const samples = [
  '{\n  "name": "JSONDog",\n  "tools": [\n    "format",\n    "validate"\n  ]\n}',
  '{"config":{"port":8080,"debug":true}}',
  '["apple","banana","cherry"]'
]

const parsed = computed(() => parse(input.value))
const error = computed(() => parsed.value.ok ? null : parsed.value.error!)
const { stats } = useJsonStats(input)

const faq = [
  { q: '编辑器有语法高亮吗？', a: '有，右侧实时显示语法高亮预览，左侧编辑同步更新。' },
  { q: '会实时校验吗？', a: '会，输入过程中底部实时显示 JSON 是否合法及错误位置。' }
]
</script>