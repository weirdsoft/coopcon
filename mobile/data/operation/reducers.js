import { combineReducers } from 'redux'
import { FETCH_OPERATIONS_SUCCESS } from './actions'

const listDefault = []
const list = (state = listDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATIONS_SUCCESS:
      return [
        ...action.operations,
      ]
    default:
      return state
  }
}

export default combineReducers({
  list,
})
