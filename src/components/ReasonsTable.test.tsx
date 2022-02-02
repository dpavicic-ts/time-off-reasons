import { render, screen, within } from '@testing-library/react'
import { TimeOffReason } from '../types'
import { ReasonsTable } from './ReasonsTable'

const reasons: TimeOffReason[] = [
  { id: 'tr1', name: 'Vacation Day', type: 'planned' },
  { id: 'tr2', name: 'Personal Day', type: 'planned' },
  { id: 'tr3', name: 'Sick Day', type: 'unplanned' },
]

describe('ReasonsTable', () => {
  it('renders columns and rows correctly', () => {
    render(<ReasonsTable reasons={reasons} />)

    const headerRow = screen.getByRole('row', { name: /name type/i })
    expect(within(headerRow).getByRole('columnheader', { name: /name/i })).toBeInTheDocument()
    expect(within(headerRow).getByRole('columnheader', { name: /type/i })).toBeInTheDocument()

    expect(screen.getByRole('row', { name: /vacation day planned/i })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: /personal day planned/i })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: /sick day unplanned/i })).toBeInTheDocument()
  })
})
