export interface TimeOffReason {
  id: string
  name: string
  type: 'planned' | 'unplanned'
}

export type CreateTimeOffReason = Omit<TimeOffReason, 'id'>
