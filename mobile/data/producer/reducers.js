import * as R from 'ramda'
import { combineReducers } from 'redux'
import { FETCH_OPERATIONS_SUCCESS } from 'Coopcon/data/operation/actions'

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATIONS_SUCCESS:
      return R.union(
        R.compose(
          R.pluck('_id'),
          R.pluck('producer'),
        )(action.operations),
      )(state)
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
          R.pluck('producer'),
        )(action.operations),
      )(state)
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
})
