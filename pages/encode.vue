<template>
  <ToolLayout tool-id="encode" :faq="faq">
    <template #input>
      <div class="flex flex-col h-full">
        <div class="px-3 py-2 border-b border-jsonborder shrink-0">
          <el-radio-group v-model="mode" size="small">
            <el-radio-button label="b64e">Base64 编码</el-radio-button>
            <el-radio-button label="b64d">Base64 解码</el-radio-button>
            <el-radio-button label="urle">URL 编码</el-radio-button>
            <el-radio-button label="urld">URL 解码</el-radio-button>
          </el-radio-group>
        </div>
        <div class="flex-1 min-h-0">
          <JsonInput v-model="input" :samples="samples" placeholder="输入文本" @clear="input = ''" />
        </div>
      </div>
    </template>
    <template #output>
      <JsonOutput :value="output" filename="encoded.txt" />
    </template>
    <template #status>
      <ErrorReport :error="error" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
const input = ref('')
const mode = ref<'b64e' | 'b64d' | 'urle' | 'urld'>('b64e')
const samples = ['{"name":"JSONDog","工具":"编码"}', 'hello world 你好']

const b64encode = (text: string) => {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  bytes.forEach((b) => { bin += String.fromCharCode(b) })
  return btoa(bin)
}
const b64decode = (text: string) => {
  const bin = atob(text.trim())
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

const error = ref<{ message: string } | null>(null)
const output = computed(() => {
  error.value = null
  if (!input.value) return ''
  try {
    switch (mode.value) {
      case 'b64e': return b64encode(input.value)
      case 'b64d': return b64decode(input.value)
      case 'urle': return encodeURIComponent(input.value)
      case 'urld': return decodeURIComponent(input.value)
    }
  } catch (e) {
    error.value = { message: (e as Error).message || '编解码失败' }
    return ''
  }
  return ''
})

const faq = [
  { q: 'Base64 支持中文吗？', a: '支持，使用 UTF-8 安全编码，可正确处理中文与 emoji。' },
  { q: 'URL 编码用什么标准？', a: '使用 encodeURIComponent，适合编码 URL 参数。' }
]
</script>