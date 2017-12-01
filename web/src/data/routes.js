import { INDEX, OPERATIONS, PRODUCT_GALLERY, PRODUCT_ADD } from './route/actions'

export default {
  [INDEX]: '/',
  [OPERATIONS]: '/:producerId/operations',
  [PRODUCT_GALLERY]: '/:producerId/products',
  [PRODUCT_ADD]: '/:producerId/products/add',
}
