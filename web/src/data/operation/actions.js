export const FETCH_PRODUCER_OPERATIONS_REQUEST = 'FETCH_PRODUCER_OPERATIONS_REQUEST'
export const FETCH_PRODUCER_OPERATIONS_SUCCESS = 'FETCH_PRODUCER_OPERATIONS_SUCCESS'
export const FETCH_PRODUCER_OPERATIONS_FAILURE = 'FETCH_PRODUCER_OPERATIONS_FAILURE'

export const fetchProducerOperations = (producerId) =>({
  type: FETCH_PRODUCER_OPERATIONS_REQUEST,
  producerId,
})

export const receiveProducerOperations = (producerId, operations) => ({
  type: FETCH_PRODUCER_OPERATIONS_SUCCESS,
  producerId,
  operations,
})

export const failReceiveProducerOperations = (reason) => ({
  type: FETCH_PRODUCER_OPERATIONS_FAILURE,
  reason,
})
