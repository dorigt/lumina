import {
  eachDayOfInterval,
  endOfMonth,
  isSameMonth,
  startOfMonth,
  subDays,
} from 'date-fns'
import type { Habit } from '../types'
import { toDateKey } from './dateKey'

export function completionKey(habitId: string, dateKey: string): string {
  return `${habitId}|${dateKey}`
}

export function isCompleted(
  completionByKey: Record<string, boolean>,
  habitId: string,
  dateKey: string,
): boolean {
  return Boolean(completionByKey[completionKey(habitId, dateKey)])
}

/** If today is not done yet, streak can still count from yesterday. */
export function dailyStreak(
  completionByKey: Record<string, boolean>,
  habitId: string,
  today: Date,
): number {
  let d = today
  const todayKey = toDateKey(d)
  if (!isCompleted(completionByKey, habitId, todayKey)) {
    d = subDays(d, 1)
  }
  let streak = 0
  for (let i = 0; i < 400; i++) {
    const key = toDateKey(d)
    if (isCompleted(completionByKey, habitId, key)) {
      streak += 1
      d = subDays(d, 1)
    } else {
      break
    }
  }
  return streak
}

export function countCompletionsInMonth(
  completionByKey: Record<string, boolean>,
  habitId: string,
  monthAnchor: Date,
): number {
  const start = startOfMonth(monthAnchor)
  const end = endOfMonth(monthAnchor)
  const days = eachDayOfInterval({ start, end })
  let n = 0
  for (const day of days) {
    const key = toDateKey(day)
    if (isSameMonth(day, monthAnchor) && isCompleted(completionByKey, habitId, key)) {
      n += 1
    }
  }
  return n
}

export function dailyCompletionRateInMonth(
  completionByKey: Record<string, boolean>,
  habit: Habit,
  monthAnchor: Date,
): number {
  if (habit.goalType !== 'daily') return 0
  const start = startOfMonth(monthAnchor)
  const end = endOfMonth(monthAnchor)
  const days = eachDayOfInterval({ start, end })
  if (days.length === 0) return 0
  let done = 0
  for (const day of days) {
    const key = toDateKey(day)
    if (isCompleted(completionByKey, habit.id, key)) done += 1
  }
  return Math.round((done / days.length) * 100)
}

export function monthlyProgress(
  completionByKey: Record<string, boolean>,
  habit: Habit,
  monthAnchor: Date,
): { current: number; target: number } {
  const target =
    habit.goalType === 'monthly' && habit.monthlyTarget != null
      ? habit.monthlyTarget
      : 0
  const current = countCompletionsInMonth(completionByKey, habit.id, monthAnchor)
  return { current, target }
}
