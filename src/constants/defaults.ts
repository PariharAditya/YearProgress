import type { AppSettings, Milestone } from '../types'

export const DEFAULT_SETTINGS: AppSettings = {
    accentTheme: 'signal',
    precision: 1,
    oledMode: false,
    showQuarter: true,
}

export const DEFAULT_MILESTONES: Milestone[] = [
    { id: 'reset', title: 'Make room for what matters', date: '2026-10-01', completed: false },
    { id: 'finish', title: 'Close the year with intention', date: '2026-12-31', completed: false },
]

export const SETTINGS_STORAGE_KEY = 'year-progress:settings'
export const MILESTONES_STORAGE_KEY = 'year-progress:milestones'