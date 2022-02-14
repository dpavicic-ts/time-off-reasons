import React, { useEffect, useState } from 'react'
import { CreateUpdateForm } from './components/CreateUpdateForm'
import { ReasonsTable } from './components/ReasonsTable'
import { TimeOffReason } from './types'

const BASE_URL = 'https://620a1d5092946600171c57ae.mockapi.io'

function App() {
  const [reasons, setReasons] = useState<TimeOffReason[]>([])

  useEffect(() => {
    fetch(`${BASE_URL}/time-off-reasons`)
      .then(res => res.json())
      .then(data => {
        setReasons(data)
      })
  }, [])

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
