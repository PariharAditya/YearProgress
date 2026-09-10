export function formatPct(value: number, precision = 1): string {
    return `${value.toFixed(precision)}%`
}

export function formatHoursRemaining(milliseconds: number): string {
    const hours = Math.max(0, Math.ceil(milliseconds / 3_600_000))
    if (hours < 24) return `${hours}h remaining`
    const days = Math.floor(hours / 24)
    return `${days}d ${hours % 24}h remaining`
}

export function formatDate(dateKey: string): string {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(
        new Date(`${dateKey}T12:00:00`),
    )
}