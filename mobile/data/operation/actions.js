export const FETCH_OPERATIONS_REQUEST = 'operations/fetch/request'
export const FETCH_OPERATIONS_SUCCESS = 'operations/fetch/success'
export const FETCH_OPERATIONS_FAILURE = 'operations/fetch/failure'

export const fetchOperations = () => ({
  type: FETCH_OPERATIONS_REQUEST,
})

export const receiveOperations = (operations) => ({
  type: FETCH_OPERATIONS_SUCCESS,
  operations,
})

export const failReceiveOperations = (reason) => ({
  type: FETCH_OPERATIONS_FAILURE,
  reason,
})
