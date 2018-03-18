import * as R from 'ramda'
import { combineReducers } from 'redux'
import { FETCH_OPERATION_ORDERS_SUCCESS } from 'Coopcon/data/operation/actions'

const getOrderProducts = R.compose(
  R.flatten(),
  R.pluck('product'),
  R.flatten(),
  R.pluck('products'),
)
const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_ORDERS_SUCCESS:
      return R.union(
        R.compose(
          R.pluck('_id'),
          getOrderProducts,
        )(action.orders),
      )(state)
    default:
      return state
  }
}

const byIdDefault = {}
const byId = (state = byIdDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_ORDERS_SUCCESS:
      return R.merge(
        R.compose(
          R.indexBy(R.prop('_id')),
          getOrderProducts,
        )(action.orders)
        ,
      )(state)
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
})
