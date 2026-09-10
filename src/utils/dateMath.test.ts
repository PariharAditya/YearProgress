import { describe, expect, it } from 'vitest'
import {
    calendarDaysBetween,
    clampPercentage,
    endOfQuarter,
    isLeapYear,
    startOfQuarter,
    startOfWeek,
} from './dateMath'

describe('dateMath', () => {
    it('identifies Gregorian leap years', () => {
        expect(isLeapYear(2024)).toBe(true)
        expect(isLeapYear(1900)).toBe(false)
        expect(isLeapYear(2000)).toBe(true)
    })

    it('starts weeks on Monday, including Sunday rollover', () => {
        expect(startOfWeek(new Date(2026, 8, 10))).toEqual(new Date(2026, 8, 7))
        expect(startOfWeek(new Date(2026, 8, 13))).toEqual(new Date(2026, 8, 7))
    })

    it('finds quarter boundaries', () => {
        expect(startOfQuarter(new Date(2026, 0, 20))).toEqual(new Date(2026, 0, 1))
        expect(endOfQuarter(new Date(2026, 8, 10))).toEqual(new Date(2026, 9, 1))
    })

    it('counts calendar days independently of local DST length', () => {
        expect(calendarDaysBetween(new Date(2026, 0, 1), new Date(2026, 11, 31))).toBe(364)
    })

    it('clamps percentages to the visible range', () => {
        expect(clampPercentage(-1)).toBe(0)
        expect(clampPercentage(101)).toBe(100)
        expect(clampPercentage(42)).toBe(42)
    })
})