import * as R from 'ramda'
import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { OPERATION, ORDER } from 'Coopcon/data/navigation/actions'
import {  TOGGLE_FILTER_OPERATION_ORDERS_BY_NOT_PAID } from './actions'

const defaultFilter = {
  unpaid: false,
}
const filter = (state = defaultFilter, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      switch(action.routeName) {
        case OPERATION:
        case ORDER:
          return state
        default:
          return defaultFilter
      }
    case TOGGLE_FILTER_OPERATION_ORDERS_BY_NOT_PAID:
      return R.evolve({
        unpaid: R.not,
      })(state)
    default:
      return state
  }
}

export default combineReducers({
  filter,
})
