import * as R from 'ramda'
import { combineReducers } from 'redux'
import { FETCH_OPERATIONS_SUCCESS } from './actions'

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATIONS_SUCCESS:
      return R.pluck('_id', action.operations)
    default:
      return state
  }
}

const byIdDefault = {}
const byId = (state = byIdDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATIONS_SUCCESS:
      return R.zipObj(R.pluck('_id', action.operations), action.operations)
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
})
