import { CreateTimeOffReason } from './types'

const BASE_URL = 'https://620a1d5092946600171c57ae.mockapi.io'

async function getReasons() {
  const res = await fetch(`${BASE_URL}/time-off-reasons`)
  return await res.json()
}

function postReason(newReason: CreateTimeOffReason) {
  return fetch(`${BASE_URL}/time-off-reasons`, {
    method: 'POST',
    body: JSON.stringify(newReason),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

export { getReasons, postReason }
