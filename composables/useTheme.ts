export const useTheme = () => {
  const isDark = useState<boolean>('theme-dark', () => true)

  const apply = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('jsondog-theme', isDark.value ? 'dark' : 'light')
    }
  }

  const init = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('jsondog-theme')
      if (saved) {
        isDark.value = saved === 'dark'
      } else {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      apply()
    }
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply()
  }

  return { isDark, init, toggle }
}