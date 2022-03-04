import React, { useEffect, useState } from 'react'
import { deleteReason, getReasons, postReason, putReason } from '../api'
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

  const createReason = async (newReason: CreateUpdateTimeOffReason) => {
    const createdReason = await postReason(newReason)
    setReasons([...reasons, createdReason])
  }

  const updateReason = async (reason: TimeOffReason) => {
    const updatedReason = await putReason(reason)
    const newReasons = reasons.map(r => (r.id === updatedReason.id ? updatedReason : r))
    setReasons(newReasons)
  }

  const removeReason = async (reason: TimeOffReason) => {
    const deletedReason = await deleteReason(reason)
    const newReasons = reasons.filter(r => r.id !== deletedReason.id)
    setReasons(newReasons)
  }

  const handleEdit = (reasonToUpdate: TimeOffReason) => {
    setReasonDraft(reasonToUpdate)
  }

  return (
    <div style={{ margin: '16px' }}>
      <h2>Time Off Reasons CRUD</h2>
      <br />
      <div style={{ margin: '0 auto', maxWidth: '600px' }}>
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
      </div>
      <ReasonsTable
        reasons={reasons}
        onEdit={handleEdit}
        onDelete={reason => removeReason(reason)}
      />
    </div>
  )
}
