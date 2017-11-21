import { INDEX, OPERATIVES, PRODUCT_GALLERY, PRODUCT_ADD } from './route/actions'

export default {
  [INDEX]: '/',
  [OPERATIVES]: '/:producerId/operatives',
  [PRODUCT_GALLERY]: '/:producerId/products',
  [PRODUCT_ADD]: '/:producerId/products/add',
}
