import { CreateUpdateTimeOffReason, TimeOffReason } from './types'

const BASE_URL = 'https://620a1d5092946600171c57ae.mockapi.io'

async function getReasons() {
  const res = await fetch(`${BASE_URL}/time-off-reasons`)
  return await res.json()
}

function postReason(newReason: CreateUpdateTimeOffReason) {
  return fetch(`${BASE_URL}/time-off-reasons`, {
    method: 'POST',
    body: JSON.stringify(newReason),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

function putReason(editedReason: TimeOffReason) {
  return fetch(`${BASE_URL}/time-off-reasons/${editedReason.id}`, {
    method: 'PUT',
    body: JSON.stringify(editedReason),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

export { getReasons, postReason, putReason }
