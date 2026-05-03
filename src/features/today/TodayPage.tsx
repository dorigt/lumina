import { addDays, format, isAfter, isSameDay, startOfDay, subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { useHabitStore } from '../../store/habitStore'
import { isCompleted } from '../../lib/stats'
import { toDateKey } from '../../lib/dateKey'
import { randomQuote } from '../../lib/quotes'
import { habitCardClass } from '../../lib/habitColors'

export function TodayPage() {
  const habits = useHabitStore((s) => s.habits)
  const completionByKey = useHabitStore((s) => s.completionByKey)
  const toggleCompletion = useHabitStore((s) => s.toggleCompletion)

  const [selected, setSelected] = useState(() => new Date())
  const [quote, setQuote] = useState<string | null>(null)

  const dateKey = useMemo(() => toDateKey(startOfDay(selected)), [selected])
  const todayStart = startOfDay(new Date())
  const isFutureDay = isAfter(startOfDay(selected), todayStart)

  const atToday = isSameDay(startOfDay(selected), todayStart)

  function goPrev() {
    setSelected((d) => subDays(d, 1))
  }

  function goNext() {
    setSelected((d) => {
      const next = addDays(d, 1)
      return isAfter(startOfDay(next), todayStart) ? d : next
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-stone-900">Check in</h1>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">
          Tap a habit when it is done for this day — calm, quick, honest.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-3xl border border-violet-100 bg-white/85 p-3 shadow-sm shadow-indigo-100/30">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-900 ring-1 ring-indigo-100"
        >
          ←
        </button>
        <div className="text-center">
          <p className="font-display text-lg font-bold text-stone-900">{format(selected, 'EEEE')}</p>
          <p className="text-sm font-medium text-stone-500">{format(selected, 'MMMM d, yyyy')}</p>
          {atToday ? (
            <span className="mt-1 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-900">
              Today
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={goNext}
          disabled={atToday}
          className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-900 ring-1 ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          →
        </button>
      </div>

      {quote ? (
        <div
          className="animate-sheet-up rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-amber-50 p-4 shadow-inner shadow-violet-100/40"
          role="status"
        >
          <p className="font-display text-base font-bold text-indigo-900">Nice one!</p>
          <p className="mt-1 text-sm leading-relaxed text-stone-700">{quote}</p>
          <button
            type="button"
            className="mt-3 text-xs font-bold text-indigo-600 underline"
            onClick={() => setQuote(null)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {habits.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-violet-200 bg-white/65 p-6 text-center text-sm text-stone-600">
          Add habits first — then your check-ins land here in one calm list.
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {habits.map((h) => {
            const done = isCompleted(completionByKey, h.id, dateKey)
            return (
              <li key={h.id}>
                <button
                  type="button"
                  disabled={isFutureDay}
                  onClick={() => {
                    if (isFutureDay) return
                    const willComplete = !done
                    if (willComplete) setQuote(randomQuote())
                    toggleCompletion(h.id, dateKey)
                  }}
                  className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${habitCardClass(h.colorIndex)} ${done ? 'animate-glow-pop ring-2 ring-indigo-300/70' : ''}`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black ${done ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200/70' : 'bg-white/95 text-stone-400 ring-1 ring-stone-200'}`}
                    aria-hidden
                  >
                    {done ? '✓' : '○'}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-bold text-stone-900">{h.name}</span>
                    <span className="text-sm text-stone-600">
                      {h.goalType === 'daily' ? 'Daily habit' : `Monthly · ${h.monthlyTarget ?? '—'} total`}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {isFutureDay ? (
        <p className="text-center text-xs font-medium text-stone-500">
          Future days are view-only — come back then to check in.
        </p>
      ) : null}
    </div>
  )
}
