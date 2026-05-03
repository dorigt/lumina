import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { GoalType, Habit } from '../types'
import { LOCAL_STORAGE_KEY } from '../branding'
import { completionKey } from '../lib/stats'

const HABIT_COLORS = 6

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export interface HabitInput {
  name: string
  goalType: GoalType
  monthlyTarget: number | null
}

interface HabitStore {
  habits: Habit[]
  completionByKey: Record<string, boolean>
  addHabit: (input: HabitInput) => void
  updateHabit: (id: string, input: HabitInput) => void
  deleteHabit: (id: string) => void
  setCompletion: (habitId: string, dateKey: string, completed: boolean) => void
  toggleCompletion: (habitId: string, dateKey: string) => void
}

function normalizeHabit(
  input: HabitInput,
  id: string,
  colorIndex: number,
  createdAt?: string,
): Habit {
  const monthlyTarget =
    input.goalType === 'monthly'
      ? Math.max(1, Math.floor(input.monthlyTarget ?? 1))
      : null
  return {
    id,
    name: input.name.trim(),
    goalType: input.goalType,
    monthlyTarget,
    createdAt: createdAt ?? new Date().toISOString(),
    colorIndex,
  }
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      completionByKey: {},

      addHabit: (input) => {
        const name = input.name.trim()
        if (!name) return
        const id = newId()
        const colorIndex = get().habits.length % HABIT_COLORS
        const habit = normalizeHabit(input, id, colorIndex)
        set((s) => ({ habits: [...s.habits, habit] }))
      },

      updateHabit: (id, input) => {
        const name = input.name.trim()
        if (!name) return
        const existing = get().habits.find((h) => h.id === id)
        if (!existing) return
        const habit = normalizeHabit(input, id, existing.colorIndex, existing.createdAt)
        set((s) => ({
          habits: s.habits.map((h) => (h.id === id ? habit : h)),
        }))
      },

      deleteHabit: (id) => {
        set((s) => {
          const nextKeys = { ...s.completionByKey }
          for (const key of Object.keys(nextKeys)) {
            if (key.startsWith(`${id}|`)) {
              delete nextKeys[key]
            }
          }
          return {
            habits: s.habits.filter((h) => h.id !== id),
            completionByKey: nextKeys,
          }
        })
      },

      setCompletion: (habitId, dateKey, completed) => {
        const key = completionKey(habitId, dateKey)
        set((s) => {
          const next = { ...s.completionByKey }
          if (completed) next[key] = true
          else delete next[key]
          return { completionByKey: next }
        })
      },

      toggleCompletion: (habitId, dateKey) => {
        const key = completionKey(habitId, dateKey)
        const cur = Boolean(get().completionByKey[key])
        get().setCompletion(habitId, dateKey, !cur)
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        habits: s.habits,
        completionByKey: s.completionByKey,
      }),
    },
  ),
)
