import { combineReducers } from 'redux'
import { INDEX, PRODUCT_GALLERY } from './actions'

const mainRoute = (state = null, action) => {
  switch(action.type) {
    case INDEX:
      return null
    case PRODUCT_GALLERY:
      return PRODUCT_GALLERY
    default:
      return state
  }
}

export default combineReducers({
  mainRoute,
})
