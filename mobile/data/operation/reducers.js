import * as R from 'ramda'
import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { OPERATION } from 'Coopcon/data/navigation/actions'
import { FETCH_OPERATIONS_SUCCESS, FETCH_OPERATION_ORDERS_SUCCESS } from './actions'

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
      return R.merge(
        R.zipObj(R.pluck('_id', action.operations), action.operations),
      )(state)
    case FETCH_OPERATION_ORDERS_SUCCESS:
      return R.evolve({
        [action.id]: R.assoc(
            'orders',
            R.pluck('_id', action.orders),
          ),
      })(state)
    default:
      return state
  }
}

const currentOperation = (state = null, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      if (action.routeName === OPERATION) {
        return action.params.id
      } else {
        return null
      }
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
  currentOperation,
})
