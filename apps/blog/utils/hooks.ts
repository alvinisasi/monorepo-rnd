import { useEffect, useRef, useState } from 'react'

export const useDebounce = (value: string, delay: number = 500): string => {
    const [debounceValue, setDebounceValue] = useState<string>('')
    const timeRef = useRef<number>()

    useEffect(() => {
        if (timeRef.current) {
            clearTimeout(timeRef.current)
        }
        timeRef.current = window.setTimeout(
            () => setDebounceValue(value),
            delay
        )

        return () => {
            clearTimeout(timeRef.current)
        }
    }, [value, delay])

    return debounceValue
}
