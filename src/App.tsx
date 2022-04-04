import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { TimeOffReasonsPage } from './pages'

function App() {
  return (
    <div>
      <ErrorBoundary>
        <TimeOffReasonsPage />
      </ErrorBoundary>
    </div>
  )
}

export default App
