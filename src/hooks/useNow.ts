import { useEffect, useState } from 'react'

export function useNow(): Date {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        let frame = 0
        const tick = () => {
            setNow(new Date())
            frame = requestAnimationFrame(tick)
        }
        const resume = () => setNow(new Date())
        frame = requestAnimationFrame(tick)
        document.addEventListener('visibilitychange', resume)
        return () => {
            cancelAnimationFrame(frame)
            document.removeEventListener('visibilitychange', resume)
        }
    }, [])

    return now
}