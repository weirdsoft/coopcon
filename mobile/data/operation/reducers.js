import * as R from 'ramda'
import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { OPERATION, ORDER, NEW_ORDER } from 'Coopcon/data/navigation/actions'
import { SAVE_NEW_ORDER_SUCCESS, DELETE_ORDER_SUCCESS } from 'Coopcon/data/order/actions'
import {
  FETCH_OPERATIONS_REQUEST, FETCH_OPERATIONS_SUCCESS, FETCH_OPERATIONS_FAILURE,
  FETCH_OPERATION_REQUEST, FETCH_OPERATION_SUCCESS, FETCH_OPERATION_FAILURE,
} from './actions'

const loading = (state = false, action) => {
  switch(action.type) {
    case FETCH_OPERATIONS_REQUEST:
    case FETCH_OPERATION_REQUEST:
      return true
    case FETCH_OPERATIONS_SUCCESS:
    case FETCH_OPERATIONS_FAILURE:
    case FETCH_OPERATION_SUCCESS:
    case FETCH_OPERATION_FAILURE:
      return false
    default:
      return state
  }
}

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATIONS_SUCCESS:
      return R.union(R.pluck('_id', action.operations))(state)
    default:
      return state
  }
}

const byIdDefault = {}
const byId = (state = byIdDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATIONS_SUCCESS:
      return R.mergeDeepLeft(
        R.compose(
          R.indexBy(R.prop('_id')),
          R.map(R.evolve({
            producer: R.prop('_id'),
          })),
        )(action.operations),
      )(state)
    case NavigationActions.NAVIGATE:
      switch(action.routeName) {
        case OPERATION:
          return R.evolve({
            [action.params.id]: R.compose(
              R.dissoc('orders'),
              R.dissoc('products'),
            ),
          })(state)
        default:
          return state
      }
    case FETCH_OPERATION_SUCCESS:
      return R.evolve({
        [action.id]: R.compose(
          R.assoc(
            'orders',
            R.pluck('_id', action.orders),
          ),
          R.assoc(
            'products',
            R.pluck('_id', action.products),
          ),
        ),
      })(state)
    case SAVE_NEW_ORDER_SUCCESS:
      return R.evolve({
        [action.order.operation._id]: {
          orders: R.append(action.order._id),
        },
      })(state)
    case DELETE_ORDER_SUCCESS:
      return R.evolve({
        [action.order.operation._id]: {
          orders: R.without([ action.order._id ]),
        },
      })(state)
    default:
      return state
  }
}

const current = (state = null, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      switch(action.routeName) {
        case OPERATION:
          return action.params.id
        case ORDER:
        case NEW_ORDER:
          return state
        default:
          return null
      }
    default:
      return state
  }
}

export default combineReducers({
  loading,
  ids,
  byId,
  current,
})
