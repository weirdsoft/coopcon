import * as R from 'ramda'
import { combineReducers } from 'redux'
import { TOGGLE_FILTER_OPERATION_ORDERS_BY_NOT_PAID } from './actions'

const defaultFilter = {
  unpaid: false,
}
const filter = (state = defaultFilter, action) => {
  switch(action.type) {
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
