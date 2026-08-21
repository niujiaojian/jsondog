interface ShortcutBinding {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  handler: () => void
}

export const useShortcut = () => {
  const bindings: ShortcutBinding[] = []

  const on = (binding: ShortcutBinding) => {
    bindings.push(binding)
  }

  const match = (e: KeyboardEvent, b: ShortcutBinding) => {
    return e.key.toLowerCase() === b.key.toLowerCase()
      && !!b.ctrl === (e.ctrlKey || e.metaKey)
      && !!b.shift === e.shiftKey
      && !!b.alt === e.altKey
  }

  onMounted(() => {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      for (const b of bindings) {
        if (match(e, b)) {
          e.preventDefault()
          b.handler()
          break
        }
      }
    })
  })

  return { on }
}