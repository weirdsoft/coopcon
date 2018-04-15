import {
  INDEX, OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS, PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
} from './route/actions'

export default {
  [INDEX]: '/',
  [OPERATIONS]: '/:producerId/operations',
  [OPERATION_ADD]: '/:producerId/operations/add',
  [OPERATION_PRODUCTS]: '/:producerId/operations/:id',
  [PRODUCT_GALLERY]: '/:producerId/products',
  [PRODUCT_ADD]: '/:producerId/products/add',
  [PRODUCT_EDIT]: '/:producerId/products/edit/:productId',
}
