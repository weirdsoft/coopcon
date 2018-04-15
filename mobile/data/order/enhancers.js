import * as R from 'ramda'
import { getProduct } from 'Coopcon/data/product/selectors'
import {
  ADD_PRODUCT_TO_ORDER, ADD_TO_PRODUCT_QUANTITY, SUBTRACT_TO_PRODUCT_QUANTITY,
} from './actions'

const addMinimalFractionAsQuantity = (getState, action) => R.merge({
  quantity: R.prop('minimalFraction')(getProduct(getState(), action.id)),
})(action)

export default {
  [ADD_PRODUCT_TO_ORDER]: addMinimalFractionAsQuantity,
  [ADD_TO_PRODUCT_QUANTITY]: addMinimalFractionAsQuantity,
  [SUBTRACT_TO_PRODUCT_QUANTITY]: addMinimalFractionAsQuantity,
}
