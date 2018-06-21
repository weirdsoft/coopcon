import * as R from 'ramda'
import { combineReducers } from 'redux'
import { AUTHORIZE_USER_SUCCESS } from './actions'

const defaultUser = {
  name: 'Anónimo',
  email: '',
  photo: '',
  role: 'guest',
}
const user = (state = defaultUser, action) => {
  switch(action.type) {
    case AUTHORIZE_USER_SUCCESS:
      return R.clone(action.user)
    default:
      return state
  }
}

export default combineReducers({
  user,
})
