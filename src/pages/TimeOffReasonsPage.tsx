import React, { useEffect, useState } from 'react'
import { getReasons, postReason } from '../api'
import { CreateUpdateForm } from '../components/CreateUpdateForm'
import { ReasonsTable } from '../components/ReasonsTable'
import { CreateTimeOffReason, TimeOffReason } from '../types'

export function TimeOffReasonsPage() {
  const [reasons, setReasons] = useState<TimeOffReason[]>([])

  useEffect(() => {
    ;(async () => {
      const data = await getReasons()
      setReasons(data)
    })()
  }, [])

  const createReason = (newReason: CreateTimeOffReason) => {
    postReason(newReason)
  }

  return (
    <>
      <CreateUpdateForm
        onSave={reason => {
          createReason(reason)
        }}
      />
      <ReasonsTable reasons={reasons} />
    </>
  )
}
