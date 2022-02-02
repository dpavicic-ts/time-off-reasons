import React from 'react'
import { CreateUpdateForm } from './components/CreateUpdateForm'
import { ReasonsTable } from './components/ReasonsTable'
import { TimeOffReason } from './types'

const reasons: TimeOffReason[] = [
  { id: 'tr1', name: 'Vacation Day', type: 'planned' },
  { id: 'tr2', name: 'Personal Day', type: 'planned' },
  { id: 'tr3', name: 'Sick Day', type: 'unplanned' },
]

function App() {
  return (
    <div>
      <CreateUpdateForm />
      <ReasonsTable reasons={reasons} />
    </div>
  )
}

export default App
