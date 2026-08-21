import type { Ref } from 'vue'
import JSON5 from 'json5'

export interface JsonStats {
  chars: number
  lines: number
  nodes: number
  size: string
  valid: boolean
}

const countNodes = (value: unknown): number => {
  if (value === null || value === undefined) return 0
  if (typeof value !== 'object') return 0
  if (Array.isArray(value)) {
    return value.length + value.reduce((s, v) => s + countNodes(v), 0)
  }
  const entries = Object.values(value as Record<string, unknown>)
  return entries.length + entries.reduce((s, v) => s + countNodes(v), 0)
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`
}

export const useJsonStats = (text: Ref<string>) => {
  const stats = computed<JsonStats>(() => {
    const raw = text.value
    const chars = raw.length
    const lines = raw ? raw.split('\n').length : 0
    const size = formatSize(new Blob([raw]).size)
    let nodes = 0
    let valid = false
    try {
      const parsed = JSON5.parse(raw)
      valid = true
      nodes = countNodes(parsed)
    } catch {
      valid = false
    }
    return { chars, lines, nodes, size, valid }
  })

  return { stats }
}
