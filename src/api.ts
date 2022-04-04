import { ErrorInfo } from 'react'
import { CreateUpdateTimeOffReason, TimeOffReason } from './types'

const BASE_URL = 'https://620a1d5092946600171c57ae.mockapi.io'

async function getReasons() {
  const res = await fetch(`${BASE_URL}/time-off-reasons`)
  return await res.json()
}

async function postReason(newReason: CreateUpdateTimeOffReason): Promise<TimeOffReason> {
  const response = await fetch(`${BASE_URL}/time-off-reasons`, {
    method: 'POST',
    body: JSON.stringify(newReason),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return await response.json()
}

async function putReason(editedReason: TimeOffReason): Promise<TimeOffReason> {
  const response = await fetch(`${BASE_URL}/time-off-reasons/${editedReason.id}`, {
    method: 'PUT',
    body: JSON.stringify(editedReason),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  return await response.json()
}

async function deleteReason(reasonToDelete: TimeOffReason): Promise<TimeOffReason> {
  const res = await fetch(`${BASE_URL}/time-off-reasons/${reasonToDelete.id}`, {
    method: 'DELETE',
  })
  return await res.json()
}

async function reportError(_error: Error, _info: ErrorInfo) {
  // In reality, this would log the error to an error reporting service
  return Promise.resolve({ success: true })
}

export { getReasons, postReason, putReason, deleteReason, reportError }
