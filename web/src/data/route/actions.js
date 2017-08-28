export const INDEX = 'ROUTE_INDEX'
export const PRODUCT_GALLERY = 'ROUTE_PRODUCT_GALLERY'

export const goToIndex = () => ({
  type: INDEX,
})

export const goToProductGallery = (producerId) => ({
  type: PRODUCT_GALLERY,
  payload: {
    producerId,
  },
})
