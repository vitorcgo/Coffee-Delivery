import { Moon, Sun } from '@phosphor-icons/react'
import { useLayoutEffect, useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage'

const THEME_KEY = 'coffee-delivery:theme'

export function ThemeToggle() {
  const [isDark, setDark] = useState(() => readStorage(THEME_KEY) === 'dark')

  useLayoutEffect(() => {
    const theme = isDark ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    writeStorage(THEME_KEY, theme)
  }, [isDark])

  return (
    <button className="theme-toggle" type="button" title={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'} aria-label="Tema escuro" aria-pressed={isDark} onClick={() => setDark((dark) => !dark)}>
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  )
}
