import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders correctly', async () => {
    render(<App />)
    userEvent.type(screen.getByLabelText(/name/i), 'National Holiday')

    userEvent.click(screen.getByLabelText(/type/i))
    await screen.findByRole('listbox')
    userEvent.click(screen.getByRole('option', { name: /unplanned/i }), undefined, {
      skipPointerEventsCheck: true,
    })

    userEvent.click(screen.getByRole('button', { name: /add reason/i }))

    // expect(screen.getByRole('row', { name: /national holiday planned/i })).toBeInTheDocument()
  })
})
