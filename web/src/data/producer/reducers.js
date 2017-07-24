import { combineReducers } from 'redux'
import {
  FETCH_PRODUCERS_REQUEST, FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCERS_FAILURE,
} from './actions'

const listDefault = []
const list = (state = listDefault, action) => {
  switch(action.type) {
    case FETCH_PRODUCERS_SUCCESS:
      return [
        ...action.producers,
      ]
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch(action.type) {
    case FETCH_PRODUCERS_REQUEST:
      return true
    case FETCH_PRODUCERS_SUCCESS:
    case FETCH_PRODUCERS_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  list,
  isLoading,
})
