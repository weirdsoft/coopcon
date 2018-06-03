import {
  INDEX, OPERATIONS, OPERATION_ADD, OPERATION_EDIT, OPERATION_PRODUCTS, OPERATION_TOTALS,
  PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
} from './route/actions'

export default {
  [INDEX]: '/',
  [OPERATIONS]: '/:producerId/operations',
  [OPERATION_ADD]: '/:producerId/operations/add',
  [OPERATION_EDIT]: '/:producerId/operations/:id/edit',
  [OPERATION_PRODUCTS]: '/:producerId/operations/:id/products',
  [OPERATION_TOTALS]: '/:producerId/operations/:id/totals',
  [PRODUCT_GALLERY]: '/:producerId/products',
  [PRODUCT_ADD]: '/:producerId/products/add',
  [PRODUCT_EDIT]: '/:producerId/products/edit/:productId',
}
