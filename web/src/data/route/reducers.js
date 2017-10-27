import { combineReducers } from 'redux'
import { INDEX, allRoutes } from './actions'

const currentRoute = (state = null, action) => {
  switch(action.type) {
    case INDEX:
      return null
    default:
      if (allRoutes.includes(action.type)) {
        return action.type
      } else {
        return state
      }
  }
}

export default combineReducers({
  currentRoute,
})
