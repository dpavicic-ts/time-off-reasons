import React, { useState } from 'react'
import { CreateUpdateForm } from './components/CreateUpdateForm'
import { ReasonsTable } from './components/ReasonsTable'
import { TimeOffReason } from './types'

const defaultReasons: TimeOffReason[] = [
  { id: 'tr1', name: 'Vacation Day', type: 'planned' },
  { id: 'tr2', name: 'Personal Day', type: 'planned' },
  { id: 'tr3', name: 'Sick Day', type: 'unplanned' },
]

function App() {
  const [reasons, setReasons] = useState(defaultReasons)

  return (
    <div>
      <CreateUpdateForm
        onSave={reason => {
          const newReason: TimeOffReason = {
            ...reason,
            id: `tr${reasons.length + 1}`,
          }
          setReasons([...reasons, newReason])
        }}
      />
      <ReasonsTable reasons={reasons} />
    </div>
  )
}

export default App
