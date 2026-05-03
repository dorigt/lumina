import { useState } from 'react'
import type { Habit } from '../../types'
import { APP_NAME } from '../../branding'
import { useHabitStore, type HabitInput } from '../../store/habitStore'
import { habitCardClass } from '../../lib/habitColors'
import { HabitFormModal } from './HabitFormModal'

export function HabitsPage() {
  const habits = useHabitStore((s) => s.habits)
  const addHabit = useHabitStore((s) => s.addHabit)
  const updateHabit = useHabitStore((s) => s.updateHabit)
  const deleteHabit = useHabitStore((s) => s.deleteHabit)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [editing, setEditing] = useState<Habit | null>(null)
  const [formSession, setFormSession] = useState(0)

  function openAdd() {
    setModalMode('add')
    setEditing(null)
    setFormSession((n) => n + 1)
    setModalOpen(true)
  }

  function openEdit(h: Habit) {
    setModalMode('edit')
    setEditing(h)
    setFormSession((n) => n + 1)
    setModalOpen(true)
  }

  function handleSave(input: HabitInput) {
    if (modalMode === 'add') addHabit(input)
    else if (editing) updateHabit(editing.id, input)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-stone-900">Your habits</h1>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">
            Name what you want to keep close — daily rhythm or a monthly count.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="shrink-0 rounded-2xl bg-indigo-600 px-4 py-2.5 font-display text-sm font-bold text-white shadow-lg shadow-indigo-200/60"
        >
          + Add
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-violet-200 bg-white/70 p-8 text-center shadow-inner shadow-violet-50/50">
          <p className="font-display text-lg font-bold text-stone-800">Start with one habit</p>
          <p className="mt-2 text-sm text-stone-600">
            Pick something tiny and kind — {APP_NAME} will remember it with you, day by day.
          </p>
          <button
            type="button"
            onClick={openAdd}
            className="mt-5 rounded-2xl bg-violet-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-violet-200/50"
          >
            Add a habit
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {habits.map((h) => (
            <li
              key={h.id}
              className={`flex flex-col gap-3 rounded-3xl border p-4 ${habitCardClass(h.colorIndex)}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-bold text-stone-900">{h.name}</p>
                  <p className="text-sm text-stone-600">
                    {h.goalType === 'daily' ? (
                      <span className="font-medium text-indigo-700">Daily</span>
                    ) : (
                      <span className="font-medium text-violet-800">
                        Monthly · {h.monthlyTarget ?? '—'} times
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(h)}
                    className="rounded-xl bg-white/90 px-3 py-1.5 text-xs font-bold text-stone-700 ring-1 ring-stone-200/80"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Remove “${h.name}” and its history?`)) deleteHabit(h.id)
                    }}
                    className="rounded-xl bg-white/90 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-amber-200/80"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <HabitFormModal
        open={modalOpen}
        mode={modalMode}
        initial={editing}
        sessionKey={formSession}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
