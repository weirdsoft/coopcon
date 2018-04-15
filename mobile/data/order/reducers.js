import * as R from 'ramda'
import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { ORDER } from 'Coopcon/data/navigation/actions'
import { FETCH_OPERATION_SUCCESS } from 'Coopcon/data/operation/actions'
import {
  TOGGLE_ORDER, SHOW_ADD_ORDER_PRODUCT_DIALOG, HIDE_ADD_ORDER_PRODUCT_DIALOG, ADD_PRODUCT_TO_ORDER,
  ADD_TO_PRODUCT_QUANTITY, SUBTRACT_TO_PRODUCT_QUANTITY, SHOW_SAVE_ORDER_DIALOG,
  HIDE_SAVE_ORDER_DIALOG, CHANGE_ORDER_USER, SAVE_NEW_ORDER_SUCCESS,
} from './actions'

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_SUCCESS:
      return R.union(R.pluck('_id', action.orders))(state)
    case SAVE_NEW_ORDER_SUCCESS:
      return R.append(action.order._id)(state)
    default:
      return state
  }
}

const evolveOrderProducts = R.evolve({
  products: R.map(
    R.evolve({
      product: R.prop('_id'),
    }),
  ),
})

const byIdDefault = {}
const byId = (state = byIdDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_SUCCESS:
      return R.merge(
        R.compose(
          R.indexBy(R.prop('_id')),
          R.map(evolveOrderProducts),
        )(action.orders),
      )(state)
    case SAVE_NEW_ORDER_SUCCESS:
      return R.assoc(action.order._id, evolveOrderProducts(action.order))(state)
    default:
      return state
  }
}

const current = (state = null, action) => {
  switch(action.type) {
    case TOGGLE_ORDER:
      return R.equals(action.id, state) ? null : action.id
    case NavigationActions.NAVIGATE:
      return null
    default:
      return state
  }
}

const creatingProductsIds = (state = null, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      if (action.routeName === ORDER) {
        return []
      } else {
        return null
      }
    case ADD_PRODUCT_TO_ORDER:
      return R.append(action.id)(state)
    default:
      return state
  }
}

const creatingProductsById = (state = null, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      if (action.routeName === ORDER) {
        return {}
      } else {
        return null
      }
    case ADD_PRODUCT_TO_ORDER:
      return R.assoc(action.id, action.quantity)(state)
    case ADD_TO_PRODUCT_QUANTITY:
      return R.evolve({
        [action.id]: R.add(action.quantity),
      })(state)
    case SUBTRACT_TO_PRODUCT_QUANTITY:
      return R.evolve({
        [action.id]: R.unless(
          R.equals(action.quantity),
          R.flip(R.subtract)(action.quantity),
        ),
      })(state)
    default:
      return state
  }
}

const creatingUser = (state = null, action) => {
  switch(action.type) {
    case SHOW_SAVE_ORDER_DIALOG:
      return ''
    case CHANGE_ORDER_USER:
      return action.user
    case HIDE_SAVE_ORDER_DIALOG:
    case NavigationActions.NAVIGATE:
      return null
    default:
      return state
  }
}

const addingProduct = (state = false, action) => {
  switch(action.type) {
    case SHOW_ADD_ORDER_PRODUCT_DIALOG:
      return true
    case HIDE_ADD_ORDER_PRODUCT_DIALOG:
      return false
    case NavigationActions.NAVIGATE:
      return false
    default:
      return state
  }
}

const saving = (state = false, action) => {
  switch(action.type) {
    case SHOW_SAVE_ORDER_DIALOG:
      return true
    case HIDE_SAVE_ORDER_DIALOG:
      return false
    case NavigationActions.NAVIGATE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
  current,
  creatingProductsIds,
  creatingProductsById,
  creatingUser,
  addingProduct,
  saving,
})
