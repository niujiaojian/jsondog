<template>
  <div>
    <div
      class="flex items-start gap-1 py-0.5 px-1 rounded hover:bg-gray-100 dark:hover:bg-white/5"
      :class="{ 'bg-yellow-100 dark:bg-yellow-900/30': matched }"
    >
      <button v-if="isContainer" @click="expanded = !expanded" class="shrink-0">
        <Icon :name="expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'" />
      </button>
      <span v-else class="inline-block w-4 shrink-0" />

      <span class="text-jsonblue font-medium">{{ label }}</span>
      <span class="text-gray-400">:</span>

      <span v-if="!isContainer" :class="valueClass">{{ valueText }}</span>
      <span v-else class="text-gray-400 cursor-pointer" @click="expanded = !expanded">{{ preview }}</span>

      <button class="ml-1 opacity-50 hover:opacity-100" title="复制路径" @click.stop="copyPath">
        <Icon name="mdi:content-copy" class="text-xs" />
      </button>
    </div>

    <div v-if="isContainer && expanded" class="ml-4 border-l border-jsonborder pl-2">
      <JsonTreeNode
        v-for="child in children"
        :key="child.key"
        :node="child.value"
        :label="child.key"
        :path="child.path"
        :search="search"
        :expand-force="expandForce"
        :level="level + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'JsonTreeNode' })

const props = defineProps<{
  node: unknown
  label: string
  path: string
  search?: string
  expandForce?: boolean
  level: number
}>()

const expanded = ref(props.level < 1)

watch(() => props.expandForce, (v) => { expanded.value = v })

const isContainer = computed(() => props.node !== null && typeof props.node === 'object')
const matched = computed(() => !!props.search && String(props.label).toLowerCase().includes(props.search.toLowerCase()))

const children = computed(() => {
  const n = props.node
  if (Array.isArray(n)) {
    return n.map((v, i) => ({ key: String(i), value: v, path: `${props.path}[${i}]` }))
  }
  if (n && typeof n === 'object') {
    return Object.entries(n as Record<string, unknown>).map(([k, v]) => ({ key: k, value: v, path: `${props.path}.${k}` }))
  }
  return []
})

const preview = computed(() => {
  if (Array.isArray(props.node)) return `Array(${props.node.length}) […]`
  if (props.node && typeof props.node === 'object') return `Object {…}`
  return ''
})

const valueText = computed(() => {
  if (props.node === null) return 'null'
  if (typeof props.node === 'string') return `"${props.node}"`
  return String(props.node)
})

const valueClass = computed(() => {
  if (props.node === null) return 'text-jsonorange'
  if (typeof props.node === 'string') return 'text-green-500'
  if (typeof props.node === 'number') return 'text-jsonblue'
  if (typeof props.node === 'boolean') return 'text-jsonorange'
  return ''
})

const copyPath = async () => {
  try {
    await navigator.clipboard.writeText(props.path)
    ElMessage.success(`已复制: ${props.path}`)
  } catch { /* ignore */ }
}
</script>