import { NOT_FOUND } from 'redux-first-router'

export const INDEX = 'ROUTE_INDEX'
export const OPERATIONS = 'ROUTE_OPERATIONS'
export const PRODUCT_GALLERY = 'ROUTE_PRODUCT_GALLERY'
export const PRODUCT_ADD = 'ROUTE_PRODUCT_ADD'
export const allRoutes = [ NOT_FOUND, INDEX, OPERATIONS, PRODUCT_GALLERY, PRODUCT_ADD ]

export const goToIndex = () => ({
  type: INDEX,
})

export const goToOperations = (producerId) => ({
  type: OPERATIONS,
  payload: {
    producerId,
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
