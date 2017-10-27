import { combineReducers } from 'redux'
import { allRoutes, OPERATIVES, PRODUCT_GALLERY } from 'data/route/actions'
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
    case OPERATIVES:
    case PRODUCT_GALLERY:
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
