import { useEffect, useState } from 'react'

export function useLocalStorageState<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored === null ? defaultValue : (JSON.parse(stored) as T)
        } catch {
            return defaultValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // Storage can be unavailable in private browsing or restricted embeds.
        }
    }, [key, value])

    return [value, setValue] as const
}