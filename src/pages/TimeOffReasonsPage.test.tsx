import { screen, render, within, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { deleteReason, getReasons, postReason, putReason } from '../api'
import { TimeOffReasonsPage } from './TimeOffReasonsPage'
import { TimeOffReason } from '../types'

jest.mock('../api')

const reasons: TimeOffReason[] = [
  { id: 'tr1', name: 'Vacation Day', type: 'planned' },
  { id: 'tr2', name: 'Personal Day', type: 'planned' },
  { id: 'tr3', name: 'Sick Day', type: 'unplanned' },
]

describe('App', () => {
  beforeEach(() => {
    ;(getReasons as jest.Mock).mockReturnValue(Promise.resolve(reasons))
  })

  afterEach(() => {
    ;(getReasons as jest.Mock).mockReset()
  })

  it('fetches and displays reasons', async () => {
    render(<TimeOffReasonsPage />)

    expect(await screen.findByRole('row', { name: /vacation day planned/i })).toBeInTheDocument()
    expect(await screen.findByRole('row', { name: /personal day planned/i })).toBeInTheDocument()
    expect(await screen.findByRole('row', { name: /sick day unplanned/i })).toBeInTheDocument()
  })
  it('creates a reason', async () => {
    const createdReason: TimeOffReason = {
      name: 'Call Out',
      type: 'unplanned',
      id: 'tr4',
    }
    ;(postReason as jest.Mock).mockReturnValueOnce(createdReason)

    render(<TimeOffReasonsPage />)

    userEvent.type(screen.getByLabelText(/name/i), 'Call Out')
    userEvent.click(screen.getByLabelText(/type/i))
    await screen.findByRole('listbox')
    // The event below doesn't work because both "ant-select-selection-item" and "ant-select-item-option" have the same title
    // userEvent.click(screen.getByTitle('Planned'), undefined, { skipPointerEventsCheck: true })
    userEvent.click(screen.getByTitle('Unplanned'), undefined, { skipPointerEventsCheck: true })

    userEvent.click(screen.getByRole('button', { name: /add reason/i }))

    expect(postReason).toBeCalledWith({
      name: 'Call Out',
      type: 'unplanned',
    })
    expect(await screen.findByRole('row', { name: /call out unplanned/i })).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(reasons.length + 2) // + added + header row
  })

  it('updates a reason', async () => {
    const updatedReason: TimeOffReason = {
      name: 'Call Out',
      type: 'planned',
      id: 'tr1',
    }
    ;(putReason as jest.Mock).mockReturnValueOnce(updatedReason)

    render(<TimeOffReasonsPage />)

    const row = await screen.findByRole('row', { name: /vacation day planned/i })
    userEvent.click(within(row).getByRole('button', { name: /edit/i }))

    userEvent.clear(screen.getByLabelText(/name/i))
    userEvent.type(screen.getByLabelText(/name/i), 'Call Out')

    userEvent.click(screen.getByRole('button', { name: /edit reason/i }))

    expect(putReason).toBeCalledWith({ id: 'tr1', name: 'Call Out', type: 'planned' })
    expect(await screen.findByRole('row', { name: /call out planned/i })).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(reasons.length + 1) // + header row
  })

  it('deletes a reason', async () => {
    const deletedReason: TimeOffReason = {
      name: 'Personal Day',
      type: 'planned',
      id: 'tr2',
    }
    ;(deleteReason as jest.Mock).mockReturnValueOnce(deletedReason)

    render(<TimeOffReasonsPage />)

    const row = await screen.findByRole('row', { name: /personal day planned/i })
    userEvent.click(within(row).getByRole('button', { name: /delete/i }))

    expect(deleteReason).toBeCalledWith(deletedReason)
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('row', { name: /personal day planned/i }),
    )
    expect(screen.getAllByRole('row')).toHaveLength(reasons.length) // one removed + header row
  })
})
