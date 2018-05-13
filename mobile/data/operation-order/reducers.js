import * as R from 'ramda'
import { combineReducers } from 'redux'
import {
  TOGGLE_FILTER_OPERATION_ORDERS_BY_NOT_PAID, TOGGLE_FILTER_OPERATION_ORDERS_BY_SEARCH,
  CHANGE_FILTER_OPERATION_ORDERS_BY_SEARCH,
} from './actions'

const defaultFilter = {
  unpaid: false,
  searchTerm: null,
}
const filter = (state = defaultFilter, action) => {
  switch(action.type) {
    case TOGGLE_FILTER_OPERATION_ORDERS_BY_NOT_PAID:
      return R.evolve({
        unpaid: R.not,
      })(state)
    case TOGGLE_FILTER_OPERATION_ORDERS_BY_SEARCH:
      return R.evolve({
        searchTerm: R.ifElse(R.isNil, R.always(''), R.always(null)),
      })(state)
    case CHANGE_FILTER_OPERATION_ORDERS_BY_SEARCH:
      return R.evolve({
        searchTerm: R.always(action.searchTerm),
      })(state)
    default:
      return state
  }
}

export default combineReducers({
  filter,
})
