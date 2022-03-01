export interface TimeOffReason {
  id: string
  name: string
  type: 'planned' | 'unplanned'
}

export type CreateUpdateTimeOffReason = Omit<TimeOffReason, 'id'> &
  Partial<Pick<TimeOffReason, 'id'>>
