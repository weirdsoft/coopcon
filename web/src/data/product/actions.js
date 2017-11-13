export const FETCH_PRODUCER_PRODUCTS_REQUEST = 'FETCH_PRODUCER_PRODUCTS_REQUEST'
export const FETCH_PRODUCER_PRODUCTS_SUCCESS = 'FETCH_PRODUCER_PRODUCTS_SUCCESS'
export const FETCH_PRODUCER_PRODUCTS_FAILURE = 'FETCH_PRODUCER_PRODUCTS_FAILURE'

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
