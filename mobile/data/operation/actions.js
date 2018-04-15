export const FETCH_OPERATIONS_REQUEST = 'operations/fetch/request'
export const FETCH_OPERATIONS_SUCCESS = 'operations/fetch/success'
export const FETCH_OPERATIONS_FAILURE = 'operations/fetch/failure'
export const FETCH_OPERATION_REQUEST = 'operation/fetch/request'
export const FETCH_OPERATION_SUCCESS = 'operation/fetch/success'
export const FETCH_OPERATION_FAILURE = 'operation/fetch/failure'

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

export const fetchOperation = (id) => ({
  type: FETCH_OPERATION_REQUEST,
  id,
})

export const receiveOperation = (id, orders, products) => ({
  type: FETCH_OPERATION_SUCCESS,
  id,
  orders,
  products,
})

export const failReceiveOperation = (reason) => ({
  type: FETCH_OPERATION_FAILURE,
  reason,
})

