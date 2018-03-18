import * as R from 'ramda'
import { combineReducers } from 'redux'
import { FETCH_OPERATION_ORDERS_SUCCESS } from 'Coopcon/data/operation/actions'

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_ORDERS_SUCCESS:
      return R.union(R.pluck('_id', action.orders))(state)
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
          R.map(
            R.evolve({
              products: R.map(
                R.evolve({
                  product: R.prop('_id'),
                }),
              ),
            }),
          ),
        )(action.orders),
      )(state)
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
})
