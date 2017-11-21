export const FETCH_PRODUCER_PRODUCTS_REQUEST = 'FETCH_PRODUCER_PRODUCTS_REQUEST'
export const FETCH_PRODUCER_PRODUCTS_SUCCESS = 'FETCH_PRODUCER_PRODUCTS_SUCCESS'
export const FETCH_PRODUCER_PRODUCTS_FAILURE = 'FETCH_PRODUCER_PRODUCTS_FAILURE'
export const CHANGE_NEW_PRODUCT = 'CHANGE_NEW_PRODUCT'
export const ADD_NEW_PRODUCT_REQUEST = 'ADD_NEW_PRODUCT_REQUEST'
export const ADD_NEW_PRODUCT_SUCCESS = 'ADD_NEW_PRODUCT_SUCCESS'
export const ADD_NEW_PRODUCT_FAILURE = 'ADD_NEW_PRODUCT_FAILURE'

export const fetchProducerProducts = (producerId) =>({
  type: FETCH_PRODUCER_PRODUCTS_REQUEST,
  producerId,
})

export const receiveProducerProducts = (producerId, products) => ({
  type: FETCH_PRODUCER_PRODUCTS_SUCCESS,
  producerId,
  products,
})

export const failReceiveProducerProducts = (reason) => ({
  type: FETCH_PRODUCER_PRODUCTS_FAILURE,
  reason,
})

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
