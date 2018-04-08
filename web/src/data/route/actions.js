import { NOT_FOUND } from 'redux-first-router'

export const INDEX = 'ROUTE_INDEX'
export const OPERATIONS = 'ROUTE_OPERATIONS'
export const OPERATION_ADD = 'ROUTE_OPERATION_ADD'
export const OPERATION_PRODUCTS = 'ROUTE_OPERATION_PRODUCTS'
export const PRODUCT_GALLERY = 'ROUTE_PRODUCT_GALLERY'
export const PRODUCT_ADD = 'ROUTE_PRODUCT_ADD'
export const PRODUCT_EDIT = 'ROUTE_PRODUCT_EDIT'
export const allRoutes = [
  NOT_FOUND, INDEX, OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS, PRODUCT_GALLERY, PRODUCT_ADD,
  PRODUCT_EDIT,
]

export const goToIndex = () => ({
  type: INDEX,
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

export const goToOperationProducts = (producerId, id) => ({
  type: OPERATION_PRODUCTS,
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
