<template>
  <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 font-mono">
    <span><Icon name="mdi:counter" class="inline mr-1" />{{ stats.chars }} {{ t('tool.chars') }}</span>
    <span><Icon name="mdi:format-line-spacing" class="inline mr-1" />{{ stats.lines }} {{ t('tool.lines') }}</span>
    <span><Icon name="mdi:file-tree-outline" class="inline mr-1" />{{ stats.nodes }} {{ t('tool.nodes') }}</span>
    <span><Icon name="mdi:weight" class="inline mr-1" />{{ stats.size }}</span>
    <span :class="stats.valid ? 'text-green-500' : 'text-red-500'">
      <Icon :name="stats.valid ? 'mdi:check-circle' : 'mdi:alert-circle'" class="inline mr-1" />
      {{ stats.valid ? t('tool.valid') : t('tool.invalid') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { JsonStats } from '~/composables/useJsonStats'
const { t } = useI18n()
defineProps<{ stats: JsonStats }>()
</script>