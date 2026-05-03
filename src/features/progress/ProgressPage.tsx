import { addMonths, format, startOfMonth, subMonths } from 'date-fns'
import { useMemo, useState } from 'react'
import { useHabitStore } from '../../store/habitStore'
import {
  dailyCompletionRateInMonth,
  dailyStreak,
  monthlyProgress,
} from '../../lib/stats'
import { randomQuote } from '../../lib/quotes'
import { habitCardClass } from '../../lib/habitColors'
import { MonthHeat } from './MonthHeat'

export function ProgressPage() {
  const habits = useHabitStore((s) => s.habits)
  const completionByKey = useHabitStore((s) => s.completionByKey)

  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()))
  const headerQuote = useMemo(() => randomQuote(), [])

  const dailyHabits = habits.filter((h) => h.goalType === 'daily')
  const avgDailyRate =
    dailyHabits.length === 0
      ? 0
      : Math.round(
          dailyHabits.reduce(
            (acc, h) => acc + dailyCompletionRateInMonth(completionByKey, h, viewMonth),
            0,
          ) / dailyHabits.length,
        )

  const monthlyHabits = habits.filter((h) => h.goalType === 'monthly')
  const monthlyWins = monthlyHabits.filter((h) => {
    const { current, target } = monthlyProgress(completionByKey, h, viewMonth)
    return target > 0 && current >= target
  }).length

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-3xl border border-violet-100 bg-gradient-to-r from-indigo-50/90 via-white to-amber-50/70 p-4 shadow-sm shadow-indigo-100/30">
        <p className="font-display text-xs font-bold uppercase tracking-wide text-indigo-600">Note to self</p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-stone-700">{headerQuote}</p>
      </div>

      <div>
        <h1 className="font-display text-2xl font-extrabold text-stone-900">Month at a glance</h1>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">
          Streaks, completion mix, and a soft heat strip for each habit.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-3xl border border-violet-100 bg-white/85 p-3 shadow-sm">
        <button
          type="button"
          onClick={() => setViewMonth((m) => subMonths(m, 1))}
          className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-900 ring-1 ring-indigo-100"
        >
          ←
        </button>
        <p className="font-display text-lg font-bold text-stone-900">{format(viewMonth, 'MMMM yyyy')}</p>
        <button
          type="button"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-900 ring-1 ring-indigo-100"
        >
          →
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-violet-200 bg-white/65 p-6 text-center text-sm text-stone-600">
          Add habits and check in — this view becomes your calm monthly overview.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/80 p-4">
              <p className="text-xs font-bold uppercase text-indigo-700">Daily avg</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-indigo-900">
                {dailyHabits.length === 0 ? '—' : `${avgDailyRate}%`}
              </p>
              <p className="text-xs text-stone-600">Days completed this month</p>
            </div>
            <div className="rounded-3xl border border-violet-100 bg-violet-50/80 p-4">
              <p className="text-xs font-bold uppercase text-violet-800">Monthly wins</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-violet-950">
                {monthlyHabits.length === 0 ? '—' : `${monthlyWins}/${monthlyHabits.length}`}
              </p>
              <p className="text-xs text-stone-600">Targets hit (monthly habits)</p>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {habits.map((h) => {
              const streak = h.goalType === 'daily' ? dailyStreak(completionByKey, h.id, new Date()) : null
              const rate = dailyCompletionRateInMonth(completionByKey, h, viewMonth)
              const mp = monthlyProgress(completionByKey, h, viewMonth)
              const barPct =
                h.goalType === 'monthly' && mp.target > 0
                  ? Math.min(100, Math.round((mp.current / mp.target) * 100))
                  : rate

              return (
                <li key={h.id} className={`rounded-3xl border p-4 ${habitCardClass(h.colorIndex)}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-lg font-bold text-stone-900">{h.name}</p>
                      <p className="text-sm text-stone-600">
                        {h.goalType === 'daily' ? (
                          <>
                            <span className="font-semibold text-indigo-700">Daily</span>
                            {streak != null ? (
                              <span className="text-stone-500"> · Streak {streak} day{streak === 1 ? '' : 's'}</span>
                            ) : null}
                          </>
                        ) : (
                          <span className="font-semibold text-violet-800">Monthly target</span>
                        )}
                      </p>
                    </div>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-700 ring-1 ring-stone-200/80">
                      {h.goalType === 'monthly' ? `${mp.current}/${mp.target}` : `${rate}%`}
                    </span>
                  </div>

                  <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/75 ring-1 ring-stone-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-400 transition-all duration-500"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-stone-500">
                    <span className="inline-block h-2 w-2 rounded-sm bg-indigo-400 align-middle" /> done
                    <span className="mx-2">·</span>
                    <span className="inline-block h-2 w-2 rounded-sm bg-amber-200 align-middle" /> open
                    <span className="mx-2">·</span>
                    <span className="inline-block h-2 w-2 rounded-sm bg-stone-200 align-middle" /> future
                  </p>
                  <MonthHeat habitId={h.id} monthAnchor={viewMonth} completionByKey={completionByKey} />
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
