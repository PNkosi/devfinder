"use client"

import React, { useMemo, useCallback } from "react"
import _ from "lodash"
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import useThemeToggle from "@/hooks/useThemeToggle"

/**
 * ThemeSwitcher component.
 * 
 * Renders a button to toggle between light and dark theme.
 * Uses useThemeToggle hook to get theme state and toggle handler.
 * Renders moon or sun icon based on current theme.
 * Debounces theme toggle handler to prevent rapid toggling.
 */
const ThemeSwitcher = React.memo(() => {
    const { theme, toggleTheme } = useThemeToggle()

    const Icon = useMemo(() => {
        return theme === 'light' ? BsMoonStarsFill : BsSunFill
    }, [theme])

    const debounceHandleThemeChange = useCallback(_.debounce(toggleTheme, 500), [toggleTheme])

    return (
        <button
            className="uppercase flex items-center gap-4 tracking-[0.5rem]"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={debounceHandleThemeChange}>
            <Icon />
        </button>
    )
})

export default ThemeSwitcher