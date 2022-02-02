import React from 'react'
import { TimeOffReason } from '../types'

interface Props {
  reasons: TimeOffReason[]
}

export function ReasonsTable({ reasons }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {reasons.map(r => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>{r.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
