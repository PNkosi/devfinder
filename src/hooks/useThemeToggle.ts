'use client'
import { useTheme } from 'next-themes'

const useThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        const isLight = theme === 'light'
        setTheme(isLight ? 'dark' : 'light')
    }

    return { theme, toggleTheme}
}

export default useThemeToggle