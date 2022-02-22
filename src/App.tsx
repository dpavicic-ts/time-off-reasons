import React, { useEffect, useState } from 'react'
import { getReasons, postReason } from './api'
import { CreateUpdateForm } from './components/CreateUpdateForm'
import { ReasonsTable } from './components/ReasonsTable'
import { CreateTimeOffReason, TimeOffReason } from './types'

function App() {
  const [reasons, setReasons] = useState<TimeOffReason[]>([])

  useEffect(() => {
    getReasons().then(data => {
      setReasons(data)
    })
  }, [])

  const createReason = (newReason: CreateTimeOffReason) => {
    postReason(newReason)
  }

  return (
    <div>
      <CreateUpdateForm
        onSave={reason => {
          createReason(reason)
        }}
      />
      <ReasonsTable reasons={reasons} />
    </div>
  )
}

export default App
