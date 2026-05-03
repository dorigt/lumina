import { eachDayOfInterval, endOfMonth, isAfter, startOfDay, startOfMonth } from 'date-fns'
import { isCompleted } from '../../lib/stats'
import { toDateKey } from '../../lib/dateKey'

interface MonthHeatProps {
  habitId: string
  monthAnchor: Date
  completionByKey: Record<string, boolean>
}

export function MonthHeat({ habitId, monthAnchor, completionByKey }: MonthHeatProps) {
  const start = startOfMonth(monthAnchor)
  const end = endOfMonth(monthAnchor)
  const days = eachDayOfInterval({ start, end })
  const today = startOfDay(new Date())

  return (
    <div className="mt-2 flex flex-wrap gap-1" aria-hidden>
      {days.map((d) => {
        const key = toDateKey(d)
        const done = isCompleted(completionByKey, habitId, key)
        const future = isAfter(startOfDay(d), today)
        const color = future ? 'bg-stone-200' : done ? 'bg-indigo-400' : 'bg-amber-200'
        return <span key={key} title={key} className={`h-2.5 w-2.5 rounded-sm ${color}`} />
      })}
    </div>
  )
}
