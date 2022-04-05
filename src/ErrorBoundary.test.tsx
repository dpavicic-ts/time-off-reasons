import React from 'react'
import { render } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'
import { reportError } from './api'

jest.mock('./api')

const mockReportError = reportError as unknown as jest.Mock<typeof reportError>

function Bomb({ shouldThrow = false }) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

beforeAll(() => {
  // hide console errors
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  ;(console.error as jest.Mock).mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

test('calls reportError and renders that was a problem', () => {
  mockReportError.mockReturnValueOnce(() => Promise.resolve({ success: true }))
  const { rerender } = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow />
    </ErrorBoundary>,
  )
  const error = expect.any(Error)
  const info = { componentStack: expect.stringContaining('Bomb') }
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(console.error).toHaveBeenCalledTimes(2) // once by jsdom, and once by React
})
