import { combineReducers } from 'redux'
import { MainStack } from './navigators'

const mainStack = (state, action) => MainStack.router.getStateForAction(action, state) || state

export default combineReducers({
  mainStack,
})
