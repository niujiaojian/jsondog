<template>
  <div class="flex flex-col h-full rounded-lg border border-jsonborder bg-white dark:bg-jsonpanel overflow-hidden">
    <div class="flex items-center gap-2 px-3 py-2 border-b border-jsonborder shrink-0">
      <span class="text-sm font-medium">{{ t('tool.input') }}</span>
      <span class="text-xs text-gray-400">{{ stats.chars }} {{ t('tool.chars') }}</span>
      <div class="ml-auto flex items-center gap-1">
        <label class="el-button el-button--small cursor-pointer">
          <Icon name="mdi:upload" class="mr-1" />{{ t('tool.upload') }}
          <input type="file" accept=".json,.txt" class="hidden" @change="onUpload" />
        </label>
        <el-dropdown v-if="samples?.length" trigger="click" @command="onSample">
          <el-button size="small"><Icon name="mdi:menu-down" />{{ t('tool.sample') }}</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(s, i) in samples" :key="i" :command="i">示例 {{ i + 1 }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button size="small" @click="$emit('clear')"><Icon name="mdi:close" /></el-button>
      </div>
    </div>
    <textarea
      v-model="text"
      :placeholder="placeholder"
      spellcheck="false"
      class="flex-1 w-full p-3 font-mono text-sm bg-transparent resize-none outline-none border-0"
      @keydown.tab.prevent="onTab"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const props = defineProps<{
  modelValue: string
  placeholder?: string
  samples?: string[]
}>()
const emit = defineEmits<{
  'update:modelValue': [v: string]
  'clear': []
}>()

const text = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const { stats } = useJsonStats(text)

const onUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  file.text().then((v) => emit('update:modelValue', v))
  ;(e.target as HTMLInputElement).value = ''
}

const onSample = (i: number) => {
  if (props.samples?.[i] != null) emit('update:modelValue', props.samples[i])
}

const onTab = (e: KeyboardEvent) => {
  const ta = e.target as HTMLTextAreaElement
  const s = ta.selectionStart
  const en = ta.selectionEnd
  const v = text.value
  text.value = v.slice(0, s) + '  ' + v.slice(en)
  nextTick(() => { ta.selectionStart = ta.selectionEnd = s + 2 })
}
</script>