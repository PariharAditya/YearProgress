import { useMemo } from 'react'
import {
    calendarDaysBetween,
    datesInYear,
    dayOfYear,
    daysInYear,
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    endOfYear,
    periodPercentage,
    startOfDay,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
    startOfYear,
    toDateKey,
} from '../utils/dateMath'
import type { PeriodMetric, TimeMetrics } from '../types'

function metric(label: string, now: Date, start: Date, end: Date, totalUnits: number): PeriodMetric {
    const elapsedUnits = Math.min(totalUnits, Math.max(0, calendarDaysBetween(start, startOfDay(now)) + 1))
    const elapsedPct = periodPercentage(now, start, end)
    return {
        label,
        elapsedPct,
        remainingPct: 100 - elapsedPct,
        elapsedUnits,
        totalUnits,
        remainingUnits: Math.max(0, totalUnits - elapsedUnits),
    }
}

export function useTimeMetrics(now: Date): TimeMetrics {
    return useMemo(() => {
        const year = now.getFullYear()
        const yearStart = startOfYear(year)
        const yearEnd = endOfYear(year)
        const yearDays = daysInYear(year)
        const monthStart = startOfMonth(now)
        const weekStart = startOfWeek(now)
        const quarterStart = startOfQuarter(now)
        const yearDates = datesInYear(year)
        const todayKey = toDateKey(now)

        return {
            now,
            yearNumber: year,
            dayOfYear: dayOfYear(now),
            daysInYear: yearDays,
            year: metric('YEAR', now, yearStart, yearEnd, yearDays),
            quarter: metric('QUARTER', now, quarterStart, endOfQuarter(now), calendarDaysBetween(quarterStart, endOfQuarter(now))),
            month: metric('MONTH', now, monthStart, endOfMonth(now), calendarDaysBetween(monthStart, endOfMonth(now))),
            week: metric('WEEK', now, weekStart, endOfWeek(now), 7),
            day: metric('DAY', now, startOfDay(now), new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1), 1),
            days: yearDates.map(({ date, dayOfYear: index }) => ({
                date,
                dayOfYear: index,
                isToday: date === todayKey,
                isPast: date < todayKey,
            })),
        }
    }, [now])
}