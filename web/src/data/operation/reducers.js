import { combineReducers } from 'redux'
import { FETCH_PRODUCER_OPERATIONS_SUCCESS } from './actions'

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_PRODUCER_OPERATIONS_SUCCESS:
      return {
        ...state,
        ...action.operations.reduce((result, operation) => {
          result[operation._id] = {
            ...state[operation._id],
            ...operation,
          }
          return result
        }, {}),
      }
    default:
      return state
  }
}

export default combineReducers({
  byId,
})
