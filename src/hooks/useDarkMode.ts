// src/hooks/useDarkMode.ts

import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Respect stored preference, then system preference
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggle, isDark: theme === 'dark' }
}
