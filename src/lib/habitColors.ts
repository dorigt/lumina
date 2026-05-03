/** Card surfaces: indigo, violet, sky, amber, slate — no red/green pairing. */
export const HABIT_CARD_STYLES = [
  'border-indigo-200/90 bg-indigo-50/95 shadow-sm shadow-indigo-100/40',
  'border-violet-200/90 bg-violet-50/95 shadow-sm shadow-violet-100/40',
  'border-sky-200/90 bg-sky-50/95 shadow-sm shadow-sky-100/40',
  'border-amber-200/90 bg-amber-50/95 shadow-sm shadow-amber-100/40',
  'border-slate-200/90 bg-slate-50/95 shadow-sm shadow-slate-100/40',
  'border-fuchsia-200/90 bg-fuchsia-50/95 shadow-sm shadow-fuchsia-100/40',
] as const

export function habitCardClass(colorIndex: number): string {
  return HABIT_CARD_STYLES[colorIndex % HABIT_CARD_STYLES.length] ?? HABIT_CARD_STYLES[0]
}
