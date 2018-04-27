import * as R from 'ramda'
import { TRACK_WITH_PROPS } from 'Coopcon/data/segment/types'
import { getProduct } from 'Coopcon/data/product/selectors'
import {
  ADD_PRODUCT_TO_ORDER, ADD_TO_PRODUCT_QUANTITY, SUBTRACT_TO_PRODUCT_QUANTITY,
  TOGGLE_PAID_ORDER_SUCCESS,
} from './actions'

const addMinimalFractionAsQuantity = (getState, action) => R.merge({
  quantity: R.prop('minimalFraction')(getProduct(getState(), action.id)),
})(action)

const addAnalyticsOnPaidOrder = (getState, action) => R.when(
  R.pathSatisfies(R.identity, [ 'order', 'paid' ]),
  R.mergeDeepLeft({
    meta: {
      analytics: {
        eventType: TRACK_WITH_PROPS,
        eventName: 'Order paid',
        eventData: {
          orderId: action.order._id,
        },
      },
    },
  }),
)(action)

export default {
  [ADD_PRODUCT_TO_ORDER]: addMinimalFractionAsQuantity,
  [ADD_TO_PRODUCT_QUANTITY]: addMinimalFractionAsQuantity,
  [SUBTRACT_TO_PRODUCT_QUANTITY]: addMinimalFractionAsQuantity,
  [TOGGLE_PAID_ORDER_SUCCESS]: addAnalyticsOnPaidOrder,
}
