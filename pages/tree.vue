<template>
  <ToolLayout tool-id="tree" :faq="faq">
    <template #input>
      <JsonInput v-model="input" :samples="samples" placeholder='{"key":"value"}' @clear="input = ''" />
    </template>
    <template #output>
      <div class="h-full flex flex-col rounded-lg border border-jsonborder bg-white dark:bg-jsonpanel overflow-hidden">
        <div class="flex items-center gap-2 px-3 py-2 border-b border-jsonborder shrink-0">
          <el-input v-model="search" size="small" placeholder="搜索键名" clearable>
            <template #prefix><Icon name="mdi:magnify" /></template>
          </el-input>
          <el-button size="small" @click="expandAll = !expandAll">{{ expandAll ? '全部折叠' : '全部展开' }}</el-button>
        </div>
        <div class="flex-1 overflow-auto p-2 font-mono text-sm">
          <template v-if="parsed.ok">
            <JsonTreeNode :node="parsed.value" label="$" path="$" :search="search" :expand-force="expandAll" :level="0" />
          </template>
          <p v-else class="text-gray-400 text-center mt-20">JSON 非法，无法生成树</p>
        </div>
      </div>
    </template>
    <template #status>
      <ErrorReport :error="parsed.ok ? null : parsed.error!" />
      <StatusBar :stats="stats" />
    </template>
  </ToolLayout>
</template>

<script setup lang="ts">
const { parse } = useJsonError()

const input = ref('')
const search = ref('')
const expandAll = ref(false)
const samples = [
  '{"store":{"book":[{"title":"A","price":12},{"title":"B","price":15}],"bicycle":{"color":"red"}}}',
  '[{"id":1,"name":"foo"},{"id":2,"name":"bar"}]',
  '{"a":{"b":{"c":{"d":1}}}}'
]

const parsed = computed(() => parse(input.value))
const { stats } = useJsonStats(input)

const faq = [
  { q: '如何复制节点路径？', a: '点击节点右侧的复制图标，得到 JSONPath 路径如 $.store.book[0].title。' },
  { q: '支持搜索吗？', a: '支持，在输出区顶部输入键名即可高亮匹配节点。' }
]
</script>