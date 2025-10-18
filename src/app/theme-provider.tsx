'use client'

import { APIProvider } from '@vis.gl/react-google-maps'
import { createContext, useCallback, useEffect, useState } from 'react'

interface ThemeContextValue {
  isDarkMode: boolean
  toggleDarkMode: () => void
  themeDir: 'rtl' | 'ltr'
  setThemeDir: (value: 'rtl' | 'ltr') => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [themeDir, setThemeDirState] = useState<'rtl' | 'ltr'>('ltr')

  // On mount, read theme and direction from localStorage
  useEffect(() => {
    // Dark mode
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark-mode') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }

    // Direction
    const storedDir = localStorage.getItem('themeDir') as 'rtl' | 'ltr' | null
    if (storedDir) {
      setThemeDirState(storedDir)
      document.documentElement.setAttribute('dir', storedDir)
    } else {
      const currentDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr'
      setThemeDirState(currentDir)
      document.documentElement.setAttribute('dir', currentDir)
    }
  }, [])

  // toggleDarkMode
  const toggleDarkMode = useCallback(() => {
    const root = document.documentElement
    if (isDarkMode) {
      setIsDarkMode(false)
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light-mode')
    } else {
      setIsDarkMode(true)
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark-mode')
    }
  }, [isDarkMode])

  // setThemeDir wrapper to store in localStorage
  const setThemeDir = useCallback((dir: 'rtl' | 'ltr') => {
    setThemeDirState(dir)
    document.documentElement.setAttribute('dir', dir)
    localStorage.setItem('themeDir', dir)
  }, [])

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
      <ThemeContext.Provider
        value={{
          isDarkMode,
          toggleDarkMode,
          themeDir,
          setThemeDir,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </APIProvider>
  )
}
