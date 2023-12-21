"use client"

import React, { useCallback } from "react"
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'
import useThemeToggle from "@/hooks/useThemeToggle"

const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useThemeToggle()

    const Icon = theme === 'light' ? BsMoonStarsFill : BsSunFill

    const debounceHandleThemeChange = useCallback(debounce(toggleTheme, 500), [toggleTheme])

    return (
        <button
            className="uppercase flex items-center gap-4 tracking-[0.5rem]"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={debounceHandleThemeChange}>
            <Icon />
        </button>
    )
}

export default ThemeSwitcher