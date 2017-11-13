import { combineReducers } from 'redux'
import { FETCH_PRODUCER_PRODUCTS_SUCCESS } from './actions'

const ids = (state = [], action) => {
  switch(action.type) {
    case FETCH_PRODUCER_PRODUCTS_SUCCESS:
      return action.products.map((product) => product._id)
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_PRODUCER_PRODUCTS_SUCCESS:
      return action.products.reduce((result, product) => {
        result[product._id] = product
        return result
      }, {})
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
})
