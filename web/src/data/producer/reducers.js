import { combineReducers } from 'redux'
import { allRoutes, OPERATIONS, PRODUCT_GALLERY, PRODUCT_ADD } from 'data/route/actions'
import { FETCH_PRODUCER_OPERATIONS_SUCCESS } from 'data/operation/actions'
import { FETCH_PRODUCER_PRODUCTS_SUCCESS, ADD_NEW_PRODUCT_SUCCESS } from 'data/product/actions'
import {
  FETCH_PRODUCERS_REQUEST, FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCERS_FAILURE,
  SHOW_ADD_NEW_PRODUCER, HIDE_ADD_NEW_PRODUCER, CHANGE_NEW_PRODUCER_NAME,
  ADD_PRODUCER_SUCCESS,
} from './actions'

const listDefault = []
const list = (state = listDefault, action) => {
  switch(action.type) {
    case FETCH_PRODUCERS_SUCCESS:
      return [
        ...action.producers,
      ]
    case ADD_PRODUCER_SUCCESS:
      return [
        ...state,
        {
          ...action.producer,
        },
      ]
    case FETCH_PRODUCER_OPERATIONS_SUCCESS:
      return [
        ...state.filter((producer) => producer._id !== action.producerId),
        {
          ...state.find((producer) => producer._id === action.producerId),
          operations: action.operations.map((operation) => operation._id),
        },
      ]
    case FETCH_PRODUCER_PRODUCTS_SUCCESS:
      return [
        ...state.filter((producer) => producer._id !== action.producerId),
        {
          ...state.find((producer) => producer._id === action.producerId),
          products: action.products.map((product) => product._id),
        },
      ]
    case ADD_NEW_PRODUCT_SUCCESS: {
      const producer = state.find((producer) => producer._id === action.producerId)
      return [
        ...state.filter((producer) => producer._id !== action.producerId),
        {
          ...producer,
          products: [
            ...producer.products,
            action.product._id,
          ],
        },
      ]
    }
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch(action.type) {
    case FETCH_PRODUCERS_REQUEST:
      return true
    case FETCH_PRODUCERS_SUCCESS:
    case FETCH_PRODUCERS_FAILURE:
      return false
    default:
      return state
  }
}

const isAdding = (state = false, action) => {
  switch(action.type) {
    case SHOW_ADD_NEW_PRODUCER:
      return true
    case HIDE_ADD_NEW_PRODUCER:
      return false
    default:
      return state
  }
}

const add = (state = null, action) => {
  switch(action.type) {
    case SHOW_ADD_NEW_PRODUCER:
      return {
        name: '',
      }
    case HIDE_ADD_NEW_PRODUCER:
      return null
    case CHANGE_NEW_PRODUCER_NAME:
      return {
        name: action.name,
      }
    default:
      return state
  }
}

const currentId = (state = null, action) => {
  switch(action.type) {
    case OPERATIONS:
    case PRODUCT_GALLERY:
    case PRODUCT_ADD:
      return action.payload.producerId
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

export default combineReducers({
  list,
  isLoading,
  isAdding,
  add,
  currentId,
})
