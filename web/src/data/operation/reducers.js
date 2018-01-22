import * as R from 'ramda'
import moment from 'moment'
import { combineReducers } from 'redux'
import { OPERATION_ADD, OPERATION_PRODUCTS, allRoutes } from 'data/route/actions'
import { FETCH_PRODUCER_SUCCESS } from 'data/producer/actions'
import {
  CHANGE_NEW_OPERATION, ADD_NEW_OPERATION_SUCCESS, FETCH_OPERATION_PRODUCTS_SUCCESS,
  TOGGLE_OPERATION_PRODUCT_STATE,
} from './actions'

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_PRODUCER_SUCCESS:
      return {
        ...state,
        ...action.producer.operations.reduce((result, operation) => {
          result[operation._id] = {
            ...state[operation._id],
            ...operation,
          }
          return result
        }, {}),
      }
    case ADD_NEW_OPERATION_SUCCESS:
      return {
        ...state,
        [action.operation._id]: {
          ...action.operation,
        },
      }
    case FETCH_OPERATION_PRODUCTS_SUCCESS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          products: action.products.map((product) => product._id),
        },
      }
    default:
      return state
  }
}

const isAdding = (state = false, action) => {
  switch(action.type) {
    case OPERATION_ADD:
      return true
    default:
      if (allRoutes.includes(action.type)) {
        return false
      } else {
        return state
      }
  }
}

const newOperationName = (state = null, action) => {
  switch(action.type) {
    case CHANGE_NEW_OPERATION:
      if (action.change.hasOwnProperty('name')) {
        return action.change.name
      } else {
        return state
      }
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const newOperationPublishDate = (state = null, action) => {
  switch(action.type) {
    case CHANGE_NEW_OPERATION:
      if (action.change.hasOwnProperty('publishDate')) {
        return action.change.publishDate
      } else {
        return state
      }
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const newOperationCloseDate = (state = null, action) => {
  switch(action.type) {
    case CHANGE_NEW_OPERATION:
      if (action.change.hasOwnProperty('closeDate')) {
        return action.change.closeDate
      } else if (action.change.hasOwnProperty('publishDate') &&
                 moment(action.change.publishDate).isAfter(state)) {
        return action.change.publishDate
      } else {
        return state
      }
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const newOperationDeliveryDate = (state = null, action) => {
  switch(action.type) {
    case CHANGE_NEW_OPERATION:
      if (action.change.hasOwnProperty('deliveryDate')) {
        return action.change.deliveryDate
      } else if (action.change.hasOwnProperty('closeDate') &&
                 moment(action.change.closeDate).isAfter(state)) {
        return action.change.closeDate
      } else if (action.change.hasOwnProperty('publishDate') &&
                 moment(action.change.publishDate).isAfter(state)) {
        return action.change.publishDate
      } else {
        return state
      }
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const newOperation = combineReducers({
  name: newOperationName,
  publishDate: newOperationPublishDate,
  closeDate: newOperationCloseDate,
  deliveryDate: newOperationDeliveryDate,
})

const currentId = (state = null, action) => {
  switch(action.type) {
    case OPERATION_PRODUCTS:
      return action.payload.id
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const changedProducts = (state = null, action) => {
  switch(action.type) {
    case OPERATION_PRODUCTS:
      return []
    case TOGGLE_OPERATION_PRODUCT_STATE:
      return R.symmetricDifference(state, [ action.productId ])
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
  newOperation,
  currentId,
  changedProducts,
})
