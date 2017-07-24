export const FETCH_PRODUCERS_REQUEST = 'FETCH_PRODUCERS_REQUEST'
export const FETCH_PRODUCERS_SUCCESS = 'FETCH_PRODUCERS_SUCCESS'
export const FETCH_PRODUCERS_FAILURE = 'FETCH_PRODUCERS_FAILURE'

export const fetchProducers = () =>({
  type: FETCH_PRODUCERS_REQUEST,
})

export const receiveProducers = (producers) => ({
  type: FETCH_PRODUCERS_SUCCESS,
  producers,
})

export const failReceiveProducers = (reason) => ({
  type: FETCH_PRODUCERS_FAILURE,
  reason,
})
