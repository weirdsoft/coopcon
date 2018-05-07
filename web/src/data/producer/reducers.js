import { combineReducers } from 'redux'
import {
  allRoutes, OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS, OPERATION_TOTALS, PRODUCT_GALLERY,
  PRODUCT_ADD, PRODUCT_EDIT,
} from 'data/route/actions'
import { ADD_NEW_OPERATION_SUCCESS } from 'data/operation/actions'
import { ADD_NEW_PRODUCT_SUCCESS } from 'data/product/actions'
import {
  FETCH_PRODUCERS_REQUEST, FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCERS_FAILURE, FETCH_PRODUCER_SUCCESS,
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
    case FETCH_PRODUCER_SUCCESS:
      return [
        ...state.filter((producer) => producer._id !== action.producer._id),
        {
          ...state.find((producer) => producer._id === action.producer._id),
          operations: action.producer.operations.map((operation) => operation._id),
          products: action.producer.products.map((product) => product._id),
        },
      ]
    case ADD_PRODUCER_SUCCESS:
      return [
        ...state,
        {
          ...action.producer,
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
    case ADD_NEW_OPERATION_SUCCESS: {
      const producer = state.find((producer) => producer._id === action.producerId)
      return [
        ...state.filter((producer) => producer._id !== action.producerId),
        {
          ...producer,
          operations: [
            ...producer.operations,
            action.operation._id,
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
    case OPERATION_ADD:
    case OPERATION_PRODUCTS:
    case OPERATION_TOTALS:
    case PRODUCT_GALLERY:
    case PRODUCT_ADD:
    case PRODUCT_EDIT:
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
