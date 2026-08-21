<template>
  <div v-if="error" class="mt-3 rounded-lg border border-red-400/40 bg-red-50 dark:bg-red-900/20 p-4">
    <div class="flex items-start gap-2">
      <Icon name="mdi:alert-circle" class="text-red-500 text-xl shrink-0 mt-0.5" />
      <div class="text-sm">
        <p class="font-semibold text-red-600 dark:text-red-400">
          {{ t('tool.invalid') }}<template v-if="error.line"> · 第 {{ error.line }} 行<template v-if="error.col">, 第 {{ error.col }} 列</template></template>
        </p>
        <p class="mt-1 text-gray-700 dark:text-gray-300">{{ error.message }}</p>
        <p v-if="error.hint" class="mt-1 text-gray-500 dark:text-gray-400">💡 {{ error.hint }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
defineProps<{
  error: { line?: number; col?: number; message: string; hint?: string } | null
}>()
</script>