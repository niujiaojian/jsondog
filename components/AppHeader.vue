<template>
  <header class="sticky top-0 z-40 border-b border-jsonborder bg-white/85 dark:bg-jsonbg/85 backdrop-blur">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg shrink-0">
        <Icon name="mdi:dog-service" class="text-jsonorange text-2xl" />
        <span>JSON<span class="text-jsonorange">Dog</span></span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1 ml-2">
        <el-dropdown trigger="click" @command="go">
          <span class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer flex items-center gap-1">
            {{ t('nav.tools') }} <Icon name="mdi:chevron-down" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="cat in categories" :key="cat">
                <div class="px-3 py-1 text-xs text-gray-400">{{ t(`category.${cat}`) }}</div>
                <el-dropdown-item v-for="tool in byCategory(cat)" :key="tool.id" :command="tool.path" :disabled="tool.soon">
                  <Icon :name="tool.icon" class="mr-2" />{{ isZh ? tool.name : tool.nameEn }}
                  <span v-if="tool.soon" class="ml-2 text-xs text-gray-400">soon</span>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <NuxtLink to="/blog" class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5">{{ t('nav.blog') }}</NuxtLink>
        <NuxtLink to="/cheatsheet" class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5">{{ t('nav.cheatsheet') }}</NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-1">
        <button class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5" title="搜索工具 (Ctrl+K)" @click="openPalette">
          <Icon name="mdi:magnify" class="text-xl" />
        </button>
        <button class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5" @click="toggleLocale" title="语言">
          <Icon name="mdi:translate" class="text-xl" />
        </button>
        <ThemeToggle />
        <a href="https://github.com" target="_blank" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5" title="GitHub">
          <Icon name="mdi:github" class="text-xl" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const { tools, byCategory } = useTools()
const isZh = computed(() => locale.value === 'zh')
const categories = ['core', 'convert', 'codegen', 'advanced'] as const

const go = (path: string) => navigateTo(path)
const toggleLocale = () => setLocale(isZh.value ? 'en' : 'zh')

const openPalette = () => {
  useState<boolean>('palette-open').value = true
}

onMounted(() => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      useState<boolean>('palette-open').value = true
    }
  })
})
</script>