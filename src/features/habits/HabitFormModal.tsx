import { useId, useState } from 'react'
import type { GoalType, Habit } from '../../types'
import type { HabitInput } from '../../store/habitStore'

interface HabitFormModalProps {
  open: boolean
  mode: 'add' | 'edit'
  initial?: Habit | null
  /** Bump when opening the modal so inner form state resets without effects. */
  sessionKey: number
  onClose: () => void
  onSave: (input: HabitInput) => void
}

function HabitFormFields({
  mode,
  initial,
  onClose,
  onSave,
  titleId,
}: {
  mode: 'add' | 'edit'
  initial?: Habit | null
  onClose: () => void
  onSave: (input: HabitInput) => void
  titleId: string
}) {
  const [name, setName] = useState(() => (initial && mode === 'edit' ? initial.name : ''))
  const [goalType, setGoalType] = useState<GoalType>(() =>
    initial && mode === 'edit' ? initial.goalType : 'daily',
  )
  const [monthlyTarget, setMonthlyTarget] = useState(() =>
    initial && mode === 'edit' ? initial.monthlyTarget ?? 12 : 12,
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSave({
      name: trimmed,
      goalType,
      monthlyTarget: goalType === 'monthly' ? monthlyTarget : null,
    })
    onClose()
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 id={titleId} className="font-display text-xl font-bold text-stone-800">
          {mode === 'add' ? 'New habit' : 'Edit habit'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-3 py-1 text-sm font-semibold text-stone-500 hover:bg-stone-100"
        >
          Close
        </button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-left">
          <span className="text-sm font-semibold text-stone-600">Name</span>
          <input
            className="rounded-2xl border border-violet-100 bg-violet-50/30 px-4 py-3 text-base text-stone-800 outline-none ring-indigo-200 focus:ring-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Morning stretch"
            autoFocus
            maxLength={80}
          />
        </label>

        <fieldset className="rounded-2xl border border-indigo-100 bg-indigo-50/25 p-4 text-left">
          <legend className="px-1 text-sm font-semibold text-stone-600">Goal</legend>
          <div className="mt-2 flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-transparent has-[:checked]:ring-indigo-300">
              <input
                type="radio"
                name="goalType"
                checked={goalType === 'daily'}
                onChange={() => setGoalType('daily')}
              />
              <span>
                <span className="block font-semibold text-stone-800">Daily</span>
                <span className="text-sm text-stone-500">Check in each day you complete it.</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/80 px-3 py-2 ring-1 ring-transparent has-[:checked]:ring-violet-300">
              <input
                type="radio"
                name="goalType"
                checked={goalType === 'monthly'}
                onChange={() => setGoalType('monthly')}
              />
              <span>
                <span className="block font-semibold text-stone-800">Monthly count</span>
                <span className="text-sm text-stone-500">Hit a number of completions this month.</span>
              </span>
            </label>
          </div>
        </fieldset>

        {goalType === 'monthly' ? (
          <label className="flex flex-col gap-1 text-left">
            <span className="text-sm font-semibold text-stone-600">Completions this month</span>
            <input
              type="number"
              min={1}
              max={200}
              className="rounded-2xl border border-violet-100 bg-violet-50/30 px-4 py-3 text-base text-stone-800 outline-none ring-violet-200 focus:ring-2"
              value={monthlyTarget}
              onChange={(e) => setMonthlyTarget(Number(e.target.value))}
            />
          </label>
        ) : null}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl border border-stone-200 bg-white py-3 font-semibold text-stone-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-400 py-3 font-display font-bold text-white shadow-md shadow-indigo-200/60"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export function HabitFormModal({ open, mode, initial, sessionKey, onClose, onSave }: HabitFormModalProps) {
  const titleId = useId()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/45 p-0 sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(ev) => {
        if (ev.target === ev.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md animate-sheet-up rounded-t-3xl border border-violet-100 bg-white p-5 shadow-2xl sm:rounded-3xl"
      >
        <HabitFormFields
          key={sessionKey}
          mode={mode}
          initial={initial}
          onClose={onClose}
          onSave={onSave}
          titleId={titleId}
        />
      </div>
    </div>
  )
}
