<template>
  <div>
    <section class="border-b border-jsonborder">
      <div class="max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
        <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          {{ t('home.hero') }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8 text-lg">{{ t('home.heroSub') }}</p>

        <div class="max-w-2xl mx-auto text-left">
          <div class="rounded-xl border border-jsonborder bg-white dark:bg-jsonpanel overflow-hidden">
            <textarea
              v-model="heroInput"
              :placeholder="t('home.pasteHint')"
              spellcheck="false"
              rows="5"
              class="w-full p-4 font-mono text-sm bg-transparent resize-none outline-none border-0"
            />
            <div class="flex items-center justify-between px-3 py-2 border-t border-jsonborder text-sm">
              <span v-if="detected" class="text-green-500">
                <Icon name="mdi:check-circle" class="inline mr-1" />已识别 JSON
              </span>
              <span v-else class="text-gray-400">支持 JSON5（注释、尾逗号）</span>
              <el-button type="primary" :disabled="!detected" @click="goFormat">
                <Icon name="mdi:format-align-left" class="mr-1" />格式化
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-10">
      <h2 class="text-xl font-bold mb-4">{{ t('category.core') }}</h2>
      <ToolGrid :tools="byCategory('core')" />
      <h2 class="text-xl font-bold mt-8 mb-4">{{ t('category.convert') }}</h2>
      <ToolGrid :tools="byCategory('convert')" />
      <h2 class="text-xl font-bold mt-8 mb-4">{{ t('category.codegen') }}</h2>
      <ToolGrid :tools="byCategory('codegen')" />
      <h2 class="text-xl font-bold mt-8 mb-4">{{ t('category.advanced') }}</h2>
      <ToolGrid :tools="byCategory('advanced')" />
    </section>

    <section class="bg-gray-100 dark:bg-jsonpanel/50 border-y border-jsonborder">
      <div class="max-w-3xl mx-auto px-4 py-12">
        <h2 class="text-2xl font-bold mb-6 text-center">{{ t('home.whyTitle') }}</h2>
        <div class="grid sm:grid-cols-3 gap-6 text-center">
          <div><Icon name="mdi:shield-lock-outline" class="text-4xl text-jsonblue mx-auto mb-2" /><p class="font-semibold">隐私优先</p><p class="text-sm text-gray-500 dark:text-gray-400">全部在浏览器内运算，数据永不上传</p></div>
          <div><Icon name="mdi:lightning-bolt" class="text-4xl text-jsonorange mx-auto mb-2" /><p class="font-semibold">极速响应</p><p class="text-sm text-gray-500 dark:text-gray-400">纯前端即时计算，无网络往返</p></div>
          <div><Icon name="mdi:tools" class="text-4xl text-jsonblue mx-auto mb-2" /><p class="font-semibold">功能齐全</p><p class="text-sm text-gray-500 dark:text-gray-400">格式化 / 转换 / 代码生成 / 可视化</p></div>
        </div>
      </div>
    </section>

    <section class="max-w-3xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold mb-6">{{ t('home.faqTitle') }}</h2>
      <el-collapse>
        <el-collapse-item title="我的数据会被上传到服务器吗？" name="1">
          <p>不会。JSONDog 是纯前端应用，所有运算都在你的浏览器内完成，数据不会发送到任何服务器。</p>
        </el-collapse-item>
        <el-collapse-item title="支持多大的 JSON 文件？" name="2">
          <p>常规数十 MB 均可处理，大文件会使用 Web Worker 避免界面卡顿。</p>
        </el-collapse-item>
        <el-collapse-item title="是否收费？" name="3">
          <p>完全免费，无需注册。未来可能在不影响工具体验的位置投放少量广告。</p>
        </el-collapse-item>
        <el-collapse-item title="支持 JSON5 吗？" name="4">
          <p>支持。允许注释、尾逗号、单引号等 JSON5 扩展语法。</p>
        </el-collapse-item>
      </el-collapse>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { byCategory } = useTools()

const heroInput = ref('')
const detected = computed(() => {
  const s = heroInput.value.trim()
  return s.startsWith('{') || s.startsWith('[')
})

const goFormat = () => {
  useState<string>('home-input').value = heroInput.value
  navigateTo('/format')
}

const faq = [
  { q: '我的数据会被上传到服务器吗？', a: '不会。JSONDog 是纯前端应用，所有运算都在你的浏览器内完成。' },
  { q: '是否收费？', a: '完全免费，无需注册。' },
  { q: '支持 JSON5 吗？', a: '支持，允许注释、尾逗号、单引号。' }
]

useHead({
  title: 'JSONDog · JSON 在线工具箱 - 格式化、校验、转换、代码生成',
  meta: [{ name: 'description', content: '专注 JSON 的在线工具集合，纯前端零上传。提供 JSON 格式化、压缩、校验、树查看、编辑器、转 YAML/XML/CSV、生成 TypeScript/Java/SQL 等代码。' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'JSONDog',
      url: 'https://jsondog.chatools.cn',
      potentialAction: { '@type': 'SearchAction', target: 'https://jsondog.chatools.cn/?q={query}', 'query-input': 'required name=query' }
    })
  }, {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    })
  }]
})
</script>