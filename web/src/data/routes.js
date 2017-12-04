import { INDEX, OPERATIONS, OPERATION_ADD, PRODUCT_GALLERY, PRODUCT_ADD } from './route/actions'

export default {
  [INDEX]: '/',
  [OPERATIONS]: '/:producerId/operations',
  [OPERATION_ADD]: '/:producerId/operations/add',
  [PRODUCT_GALLERY]: '/:producerId/products',
  [PRODUCT_ADD]: '/:producerId/products/add',
}
