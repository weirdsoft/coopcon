import {
  INDEX, OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS, PRODUCT_GALLERY, PRODUCT_ADD,
} from './route/actions'

export default {
  [INDEX]: '/',
  [OPERATIONS]: '/:producerId/operations',
  [OPERATION_ADD]: '/:producerId/operations/add',
  [OPERATION_PRODUCTS]: '/:producerId/operations/:id',
  [PRODUCT_GALLERY]: '/:producerId/products',
  [PRODUCT_ADD]: '/:producerId/products/add',
}
