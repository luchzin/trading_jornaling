import { ref, onMounted } from 'vue'

export const useTheme = () => {
  const theme = useState<'dark' | 'light'>('app_theme', () => 'dark')

  const applyTheme = (val: 'dark' | 'light') => {
    theme.value = val
    if (import.meta.client) {
      localStorage.setItem('theme', val)
      if (val === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
      if (saved === 'light' || saved === 'dark') {
        applyTheme(saved)
      } else {
        applyTheme('dark')
      }
    }
  }

  return {
    theme,
    toggleTheme,
    initTheme
  }
}

