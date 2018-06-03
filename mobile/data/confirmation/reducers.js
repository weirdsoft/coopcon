import { combineReducers } from 'redux'
import { DISPLAY_CONFIRMATION, DISMISS_CONFIRMATION } from './actions'

const visible = (state = false, action) => {
  switch (action.type) {
    case DISPLAY_CONFIRMATION:
      return true
    case DISMISS_CONFIRMATION:
      return false
    default:
      return state
  }
}

const title = (state = null, action) => {
  switch (action.type) {
    case DISPLAY_CONFIRMATION:
      return action.title
    case DISMISS_CONFIRMATION:
      return null
    default:
      return state
  }
}

const text = (state = null, action) => {
  switch (action.type) {
    case DISPLAY_CONFIRMATION:
      return action.text
    case DISMISS_CONFIRMATION:
      return null
    default:
      return state
  }
}

export default combineReducers({
  visible,
  title,
  text,
})
