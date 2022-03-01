import React, { useEffect, useState } from 'react'
import { getReasons, postReason, putReason } from '../api'
import { CreateUpdateForm } from '../components/CreateUpdateForm'
import { ReasonsTable } from '../components/ReasonsTable'
import { CreateUpdateTimeOffReason, TimeOffReason } from '../types'

export function TimeOffReasonsPage() {
  const [reasons, setReasons] = useState<TimeOffReason[]>([])
  const [reasonDraft, setReasonDraft] = useState<TimeOffReason | null>(null)

  useEffect(() => {
    ;(async () => {
      const data = await getReasons()
      setReasons(data)
    })()
  }, [])

  const createReason = (newReason: CreateUpdateTimeOffReason) => {
    postReason(newReason)
  }

  const updateReason = (reason: TimeOffReason) => {
    putReason(reason)
  }

  const handleEdit = (reasonToUpdate: TimeOffReason) => {
    setReasonDraft(reasonToUpdate)
  }

  return (
    <>
      <CreateUpdateForm
        reason={reasonDraft}
        onSave={reason => {
          if (reason.id) {
            updateReason(reason as TimeOffReason)
          } else {
            createReason(reason)
          }
        }}
        onCancel={() => {
          setReasonDraft(null)
        }}
      />
      <ReasonsTable reasons={reasons} onEdit={handleEdit} />
    </>
  )
}
