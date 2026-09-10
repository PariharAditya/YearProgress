export type AccentThemeId = 'signal' | 'copper' | 'mint' | 'iris'

export type TabId = 'overview' | 'matrix' | 'widgets' | 'milestones' | 'install'

export interface AccentTheme {
    id: AccentThemeId
    name: string
    accent: string
    accentStrong: string
    accentSoft: string
    contrast: string
}

export interface AppSettings {
    accentTheme: AccentThemeId
    precision: 0 | 1 | 2 | 3 | 4 | 5 | 6
    oledMode: boolean
    showQuarter: boolean
    showMilliseconds: boolean
    themeMode: 'dark' | 'light' | 'system'
}

export interface Milestone {
    id: string
    title: string
    date: string
    completed: boolean
}

export interface PeriodMetric {
    label: string
    elapsedPct: number
    remainingPct: number
    elapsedUnits: number
    totalUnits: number
    remainingUnits: number
}

export interface TimeMetrics {
    now: Date
    year: PeriodMetric
    quarter: PeriodMetric
    month: PeriodMetric
    week: PeriodMetric
    day: PeriodMetric
    yearNumber: number
    dayOfYear: number
    daysInYear: number
    currentQuarter: number
    hoursPassed: number
    hoursRemaining: number
    days: Array<{ date: string; dayOfYear: number; isToday: boolean; isPast: boolean }>
}