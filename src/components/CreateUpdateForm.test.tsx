import { render, screen } from '@testing-library/react'
import { CreateUpdateForm } from './CreateUpdateForm'

describe('CreateUpdateForm', () => {
  describe('renders form correctly', () => {
    it('version 1', () => {
      render(<CreateUpdateForm />)
      const [cancelBtn, addBtn] = screen.getAllByRole('button')

      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      expect(cancelBtn).toBeInTheDocument()
      expect(addBtn).toBeInTheDocument()
    })

    it('version 2', () => {
      render(<CreateUpdateForm />)

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/type/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add reason/i })).toBeInTheDocument()
    })

    it('version 3', () => {
      render(<CreateUpdateForm />)

      expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
      expect(screen.getByRole('combobox', { name: /type/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /add reason/i })).toBeInTheDocument()
    })
  })
})
