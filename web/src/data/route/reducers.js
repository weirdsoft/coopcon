import { combineReducers } from 'redux'
import { allRoutes } from './actions'

const currentRoute = (state = null, action) => {
  if (allRoutes.includes(action.type)) {
    return action.type
  } else {
    return state
  }
}

export default combineReducers({
  currentRoute,
})
