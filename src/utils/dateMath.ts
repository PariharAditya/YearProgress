export const MS_PER_DAY = 86_400_000

export function isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

export function daysInYear(year: number): number {
    return isLeapYear(year) ? 366 : 365
}

export function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function startOfYear(year: number): Date {
    return new Date(year, 0, 1)
}

export function endOfYear(year: number): Date {
    return new Date(year + 1, 0, 1)
}

export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

export function startOfWeek(date: Date): Date {
    const day = date.getDay()
    const mondayOffset = day === 0 ? -6 : 1 - day
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + mondayOffset)
}

export function endOfWeek(date: Date): Date {
    const start = startOfWeek(date)
    return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7)
}

export function quarterForMonth(month: number): number {
    return Math.floor(month / 3) + 1
}

export function startOfQuarter(date: Date): Date {
    const month = Math.floor(date.getMonth() / 3) * 3
    return new Date(date.getFullYear(), month, 1)
}

export function endOfQuarter(date: Date): Date {
    const start = startOfQuarter(date)
    return new Date(start.getFullYear(), start.getMonth() + 3, 1)
}

export function calendarDaysBetween(start: Date, end: Date): number {
    const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
    const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
    return Math.round((endUtc - startUtc) / MS_PER_DAY)
}

export function dayOfYear(date: Date): number {
    return calendarDaysBetween(startOfYear(date.getFullYear()), date) + 1
}

export function clampPercentage(value: number): number {
    return Math.min(100, Math.max(0, value))
}

export function periodPercentage(now: Date, start: Date, end: Date): number {
    return clampPercentage(((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100)
}

export function datesInYear(year: number): Array<{ date: string; dayOfYear: number }> {
    return Array.from({ length: daysInYear(year) }, (_, index) => {
        const date = new Date(year, 0, index + 1)
        return { date: toDateKey(date), dayOfYear: index + 1 }
    })
}

export function toDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}