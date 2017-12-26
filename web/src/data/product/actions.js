export const CHANGE_NEW_PRODUCT = 'CHANGE_NEW_PRODUCT'
export const ADD_NEW_PRODUCT_REQUEST = 'ADD_NEW_PRODUCT_REQUEST'
export const ADD_NEW_PRODUCT_SUCCESS = 'ADD_NEW_PRODUCT_SUCCESS'
export const ADD_NEW_PRODUCT_FAILURE = 'ADD_NEW_PRODUCT_FAILURE'

export const changeNewProduct = (change) => ({
  type: CHANGE_NEW_PRODUCT,
  change,
})

export const addNewProduct = () => ({
  type: ADD_NEW_PRODUCT_REQUEST,
})

export const receiveNewProduct = (producerId, product) => ({
  type: ADD_NEW_PRODUCT_SUCCESS,
  producerId,
  product,
})

export const failReceiveNewProduct = (reason) => ({
  type: ADD_NEW_PRODUCT_FAILURE,
  reason,
})
