import { ACCENT_THEMES } from '../constants/themes'
import type { AccentThemeId } from '../types'

export function useAccentTheme(themeId: AccentThemeId) {
    return ACCENT_THEMES.find((theme) => theme.id === themeId) ?? ACCENT_THEMES[0]
}