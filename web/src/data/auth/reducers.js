import * as R from 'ramda'
import { combineReducers } from 'redux'
import { FETCH_USER_SUCCESS } from './actions'

const defaultUser = {
  name: 'Anónimo',
  email: '',
  photo: '',
  role: 'guest',
}
const user = (state = defaultUser, action) => {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return R.clone(action.user)
    default:
      return state
  }
}

export default combineReducers({
  user,
})
