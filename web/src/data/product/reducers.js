import { combineReducers } from 'redux'
import { PRODUCT_ADD, allRoutes } from 'data/route/actions'
import {
  FETCH_PRODUCER_PRODUCTS_SUCCESS, CHANGE_NEW_PRODUCT, ADD_NEW_PRODUCT_SUCCESS,
} from './actions'

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
    case ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        [action.product._id]: {
          ...action.product,
        },
      }
    default:
      return state
  }
}

const isAdding = (state = false, action) => {
  switch(action.type) {
    case PRODUCT_ADD:
      return true
    default:
      if (allRoutes.includes(action.type)) {
        return false
      } else {
        return state
      }
  }
}

const defaultNewProduct = {
  name: null,
  quantity: null,
  unit: null,
  price: null,
}
const newProduct = (state = null, action) => {
  switch(action.type) {
    case PRODUCT_ADD:
      return defaultNewProduct
    case CHANGE_NEW_PRODUCT:
      return {
        ...state,
        ...action.change,
      }
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

export default combineReducers({
  byId,
  isAdding,
  newProduct,
})
