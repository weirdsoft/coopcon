import moment from 'moment'
import { combineReducers } from 'redux'
import { OPERATION_ADD, allRoutes } from 'data/route/actions'
import { FETCH_PRODUCER_OPERATIONS_SUCCESS, CHANGE_NEW_OPERATION } from './actions'

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_PRODUCER_OPERATIONS_SUCCESS:
      return {
        ...state,
        ...action.operations.reduce((result, operation) => {
          result[operation._id] = {
            ...state[operation._id],
            ...operation,
          }
          return result
        }, {}),
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

export default combineReducers({
  byId,
  isAdding,
  newOperation,
})
