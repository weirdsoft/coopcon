export const CHANGE_NEW_OPERATION = 'CHANGE_NEW_OPERATION'
export const ADD_NEW_OPERATION_REQUEST = 'ADD_NEW_OPERATION_REQUEST'
export const ADD_NEW_OPERATION_SUCCESS = 'ADD_NEW_OPERATION_SUCCESS'
export const ADD_NEW_OPERATION_FAILURE = 'ADD_NEW_OPERATION_FAILURE'
export const FETCH_OPERATION_PRODUCTS_REQUEST = 'FETCH_OPERATION_PRODUCTS_REQUEST'
export const FETCH_OPERATION_PRODUCTS_SUCCESS = 'FETCH_OPERATION_PRODUCTS_SUCCESS'
export const FETCH_OPERATION_PRODUCTS_FAILURE = 'FETCH_OPERATION_PRODUCTS_FAILURE'

export const changeNewOperation = (change) => ({
  type: CHANGE_NEW_OPERATION,
  change,
})

export const addNewOperation = () => ({
  type: ADD_NEW_OPERATION_REQUEST,
})

export const receiveNewOperation = (producerId, operation) => ({
  type: ADD_NEW_OPERATION_SUCCESS,
  producerId,
  operation,
})

export const failReceiveNewOperation = (reason) => ({
  type: ADD_NEW_OPERATION_FAILURE,
  reason,
})

export const fetchOperationProducts = (id) => ({
  type: FETCH_OPERATION_PRODUCTS_REQUEST,
  id,
})

export const receiveOperationProducts = (id, products) => ({
  type: FETCH_OPERATION_PRODUCTS_SUCCESS,
  id,
  products,
})

export const failReceiveOperationProducts = (reason) => ({
  type: FETCH_OPERATION_PRODUCTS_FAILURE,
  reason,
})
