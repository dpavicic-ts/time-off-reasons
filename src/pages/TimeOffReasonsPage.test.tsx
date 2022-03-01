import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getReasons, postReason } from '../api'
import { TimeOffReasonsPage } from './TimeOffReasonsPage'
import { CreateUpdateTimeOffReason, TimeOffReason } from '../types'

jest.mock('../api')

const reasons: TimeOffReason[] = [
  { id: 'tr1', name: 'Vacation Day', type: 'planned' },
  { id: 'tr2', name: 'Personal Day', type: 'planned' },
  { id: 'tr3', name: 'Sick Day', type: 'unplanned' },
]

describe('App', () => {
  it('displays fetched reasons', async () => {
    ;(getReasons as jest.Mock).mockReturnValueOnce(Promise.resolve(reasons))
    render(<TimeOffReasonsPage />)

    expect(await screen.findByRole('row', { name: /vacation day planned/i })).toBeInTheDocument()
    expect(await screen.findByRole('row', { name: /personal day planned/i })).toBeInTheDocument()
    expect(await screen.findByRole('row', { name: /sick day unplanned/i })).toBeInTheDocument()
  })
  it('saves a reason', async () => {
    render(<TimeOffReasonsPage />)

    userEvent.type(screen.getByLabelText(/name/i), 'Call Out')

    userEvent.click(screen.getByLabelText(/type/i))
    await screen.findByRole('listbox')
    // The event below doesn't work because both "ant-select-selection-item" and "ant-select-item-option" have the same title
    // userEvent.click(screen.getByTitle('Planned'), undefined, { skipPointerEventsCheck: true })
    userEvent.click(screen.getByTitle('Unplanned'), undefined, { skipPointerEventsCheck: true })

    userEvent.click(screen.getByRole('button', { name: /add reason/i }))

    const expectedReason: CreateUpdateTimeOffReason = {
      name: 'Call Out',
      type: 'unplanned',
    }
    expect(postReason).toBeCalledWith(expectedReason)
  })
})
