import * as R from 'ramda'
import { combineReducers } from 'redux'
import { PRODUCT_ADD, PRODUCT_EDIT, allRoutes } from 'data/route/actions'
import { FETCH_PRODUCER_SUCCESS } from 'data/producer/actions'
import {
  CHANGE_NEW_PRODUCT, ADD_NEW_PRODUCT_SUCCESS, CHANGE_EDITING_PRODUCT, EDIT_PRODUCT_SUCCESS,
} from './actions'

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_PRODUCER_SUCCESS:
      return {
        ...state,
        ...action.producer.products.reduce((result, product) => {
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
    case EDIT_PRODUCT_SUCCESS:
      return R.assoc(action.product._id, action.product)(state)
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
  unit: null,
  minimalFraction: null,
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

const editingId = (state = null, action) => {
  switch(action.type) {
    case PRODUCT_EDIT:
      return action.payload.productId
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const editingChanges = (state = null, action) => {
  switch(action.type) {
    case PRODUCT_EDIT:
      return {}
    case CHANGE_EDITING_PRODUCT:
      return R.merge(state, action.change)
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
  editingId,
  editingChanges,
})
