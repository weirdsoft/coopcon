export const CHANGE_NEW_OPERATION = 'CHANGE_NEW_OPERATION'
export const ADD_NEW_OPERATION_REQUEST = 'ADD_NEW_OPERATION_REQUEST'
export const ADD_NEW_OPERATION_SUCCESS = 'ADD_NEW_OPERATION_SUCCESS'
export const ADD_NEW_OPERATION_FAILURE = 'ADD_NEW_OPERATION_FAILURE'
export const CHANGE_EDITING_OPERATION = 'CHANGE_EDITING_OPERATION'
export const UPDATE_OPERATION_REQUEST = 'UPDATE_OPERATION_REQUEST'
export const UPDATE_OPERATION_SUCCESS = 'UPDATE_OPERATION_SUCCESS'
export const UPDATE_OPERATION_FAILURE = 'UPDATE_OPERATION_FAILURE'
export const FETCH_OPERATION_PRODUCTS_REQUEST = 'FETCH_OPERATION_PRODUCTS_REQUEST'
export const FETCH_OPERATION_PRODUCTS_SUCCESS = 'FETCH_OPERATION_PRODUCTS_SUCCESS'
export const FETCH_OPERATION_PRODUCTS_FAILURE = 'FETCH_OPERATION_PRODUCTS_FAILURE'
export const FETCH_OPERATION_TOTALS_REQUEST = 'FETCH_OPERATION_TOTALS_REQUEST'
export const FETCH_OPERATION_TOTALS_SUCCESS = 'FETCH_OPERATION_TOTALS_SUCCESS'
export const FETCH_OPERATION_TOTALS_FAILURE = 'FETCH_OPERATION_TOTALS_FAILURE'
export const TOGGLE_OPERATION_PRODUCT_STATE_REQUEST = 'TOGGLE_OPERATION_PRODUCT_STATE_REQUEST'
export const TOGGLE_OPERATION_PRODUCT_STATE_SUCCESS = 'TOGGLE_OPERATION_PRODUCT_STATE_SUCCESS'
export const TOGGLE_OPERATION_PRODUCT_STATE_FAILURE = 'TOGGLE_OPERATION_PRODUCT_STATE_FAILURE'

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

export const changeEditingOperation = (change) => ({
  type: CHANGE_EDITING_OPERATION,
  change,
})

export const updateOperation = () => ({
  type: UPDATE_OPERATION_REQUEST,
})

export const receiveUpdatedOperation = (operation) => ({
  type: UPDATE_OPERATION_SUCCESS,
  operation,
})

export const failReceiveUpdatedOperation = (reason) => ({
  type: UPDATE_OPERATION_FAILURE,
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

export const fetchOperationTotals = (id) => ({
  type: FETCH_OPERATION_TOTALS_REQUEST,
  id,
})

export const receiveOperationTotals = (id, totals) => ({
  type: FETCH_OPERATION_TOTALS_SUCCESS,
  id,
  totals,
})

export const failReceiveOperationTotals = (reason) => ({
  type: FETCH_OPERATION_TOTALS_FAILURE,
  reason,
})

export const toggleOperationProductState = (productId) => ({
  type: TOGGLE_OPERATION_PRODUCT_STATE_REQUEST,
  productId,
})

export const succeedToggleOperationProductState = (id, productId) => ({
  type: TOGGLE_OPERATION_PRODUCT_STATE_SUCCESS,
  id,
  productId,
})

export const failToggleOperationProductState = (productId, reason) => ({
  type: TOGGLE_OPERATION_PRODUCT_STATE_FAILURE,
  productId,
  reason,
})
