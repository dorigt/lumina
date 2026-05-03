import { format, parseISO, isValid } from 'date-fns'

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function parseDateKey(key: string): Date {
  const d = parseISO(key)
  if (!isValid(d)) {
    throw new Error(`Invalid date key: ${key}`)
  }
  return d
}
