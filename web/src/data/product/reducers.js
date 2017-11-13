import { combineReducers } from 'redux'
import { FETCH_PRODUCER_PRODUCTS_SUCCESS } from './actions'

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_PRODUCER_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...action.products.reduce((result, product) => {
          result[product._id] = {
            ...state[product._id],
            ...product,
          }
          return result
        }, {}),
      }
    default:
      return state
  }
}

export default combineReducers({
  byId,
})
