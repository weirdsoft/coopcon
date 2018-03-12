export const FETCH_OPERATIONS_REQUEST = 'operations/fetch/request'
export const FETCH_OPERATIONS_SUCCESS = 'operations/fetch/success'
export const FETCH_OPERATIONS_FAILURE = 'operations/fetch/failure'
export const FETCH_OPERATION_ORDERS_REQUEST = 'operation/orders/fetch/request'
export const FETCH_OPERATION_ORDERS_SUCCESS = 'operation/orders/fetch/success'
export const FETCH_OPERATION_ORDERS_FAILURE = 'operation/orders/fetch/failure'

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

export const fetchOperationOrders = (id) => ({
  type: FETCH_OPERATION_ORDERS_REQUEST,
  id,
})

export const receiveOperationOrders = (id, orders) => ({
  type: FETCH_OPERATION_ORDERS_SUCCESS,
  id,
  orders,
})

export const failReceiveOperationOrders = (reason) => ({
  type: FETCH_OPERATION_ORDERS_FAILURE,
  reason,
})

