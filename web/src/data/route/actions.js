import { NOT_FOUND } from 'redux-first-router'

export const INDEX = 'ROUTE_INDEX'
export const LOGIN = 'LOGIN'
export const OPERATIONS = 'ROUTE_OPERATIONS'
export const OPERATION_ADD = 'ROUTE_OPERATION_ADD'
export const OPERATION_EDIT = 'ROUTE_OPERATION_EDIT'
export const OPERATION_PRODUCTS = 'ROUTE_OPERATION_PRODUCTS'
export const OPERATION_TOTALS = 'ROUTE_OPERATION_TOTALS'
export const PRODUCT_GALLERY = 'ROUTE_PRODUCT_GALLERY'
export const PRODUCT_ADD = 'ROUTE_PRODUCT_ADD'
export const PRODUCT_EDIT = 'ROUTE_PRODUCT_EDIT'
export const allRoutes = [
  NOT_FOUND, INDEX, LOGIN, OPERATIONS, OPERATION_ADD, OPERATION_EDIT, OPERATION_PRODUCTS,
  OPERATION_TOTALS, PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
]

export const goToIndex = () => ({
  type: INDEX,
})

export const goToLogin = () => ({
  type: LOGIN,
})

export const goToOperations = (producerId) => ({
  type: OPERATIONS,
  payload: {
    producerId,
  },
})

export const goToOperationAdd = (producerId) => ({
  type: OPERATION_ADD,
  payload: {
    producerId,
  },
})

export const goToOperationEdit = (producerId, id) => ({
  type: OPERATION_EDIT,
  payload: {
    producerId,
    id,
  },
})

export const goToOperationProducts = (producerId, id) => ({
  type: OPERATION_PRODUCTS,
  payload: {
    producerId,
    id,
  },
})

export const goToOperationTotals = (producerId, id) => ({
  type: OPERATION_TOTALS,
  payload: {
    producerId,
    id,
  },
})

export const goToProductGallery = (producerId) => ({
  type: PRODUCT_GALLERY,
  payload: {
    producerId,
  },
})

export const goToProductAdd = (producerId) => ({
  type: PRODUCT_ADD,
  payload: {
    producerId,
  },
})

export const goToProductEdit = (producerId, productId) => ({
  type: PRODUCT_EDIT,
  payload: {
    producerId,
    productId,
  },
})
