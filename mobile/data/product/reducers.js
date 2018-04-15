import * as R from 'ramda'
import { combineReducers } from 'redux'
import { FETCH_OPERATION_SUCCESS } from 'Coopcon/data/operation/actions'

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_SUCCESS:
      return R.union(
        R.pluck('_id', action.products),
      )(state)
    default:
      return state
  }
}

const byIdDefault = {}
const byId = (state = byIdDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_SUCCESS:
      return R.merge(
        R.indexBy(R.prop('_id'), action.products),
      )(state)
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
})
