import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders correctly', async () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/name/i), 'Call Out')

    userEvent.click(screen.getByLabelText(/type/i))
    await screen.findByRole('listbox')
    // The event below doesn't work because both "ant-select-selection-item" and "ant-select-item-option" have the same title
    // userEvent.click(screen.getByTitle('Planned'), undefined, { skipPointerEventsCheck: true })
    userEvent.click(screen.getByTitle('Unplanned'), undefined, { skipPointerEventsCheck: true })

    userEvent.click(screen.getByRole('button', { name: /add reason/i }))

    expect(screen.getByRole('row', { name: /call out unplanned/i })).toBeInTheDocument()
  })
})
