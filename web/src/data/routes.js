import { INDEX, OPERATIVES, PRODUCT_GALLERY } from './route/actions'

export default {
  [INDEX]: '/',
  [OPERATIVES]: '/:producerId/operatives',
  [PRODUCT_GALLERY]: '/:producerId/products',
}
