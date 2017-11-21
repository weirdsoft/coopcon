export const INDEX = 'ROUTE_INDEX'
export const OPERATIVES = 'ROUTE_OPERATIVES'
export const PRODUCT_GALLERY = 'ROUTE_PRODUCT_GALLERY'
export const PRODUCT_ADD = 'ROUTE_PRODUCT_ADD'
export const allRoutes = [ INDEX, OPERATIVES, PRODUCT_GALLERY, PRODUCT_ADD ]

export const goToIndex = () => ({
  type: INDEX,
})

export const goToOperatives = (producerId) => ({
  type: OPERATIVES,
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
