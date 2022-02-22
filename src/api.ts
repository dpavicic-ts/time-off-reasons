import { CreateTimeOffReason } from './types'

const BASE_URL = 'https://620a1d5092946600171c57ae.mockapi.io'

function getReasons() {
  return fetch(`${BASE_URL}/time-off-reasons`).then(res => res.json())
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
