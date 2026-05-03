export type GoalType = 'daily' | 'monthly'

export interface Habit {
  id: string
  name: string
  goalType: GoalType
  /** Required when goalType is monthly */
  monthlyTarget: number | null
  createdAt: string
  colorIndex: number
}
