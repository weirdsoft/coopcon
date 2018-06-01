import * as R from 'ramda'
import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { OPERATION, ORDER, NEW_ORDER } from 'Coopcon/data/navigation/actions'
import { FETCH_OPERATION_SUCCESS } from 'Coopcon/data/operation/actions'
import {
  TOGGLE_ORDER,
  SHOW_ADD_ORDER_PRODUCT_DIALOG, HIDE_ADD_ORDER_PRODUCT_DIALOG,
  ADD_PRODUCT_TO_ORDER, REMOVE_PRODUCT_FROM_ORDER,
  ADD_TO_PRODUCT_QUANTITY, SUBTRACT_TO_PRODUCT_QUANTITY,
  SHOW_SAVE_ORDER_DIALOG, HIDE_SAVE_ORDER_DIALOG,
  CHANGE_ORDER_USER,
  SAVE_NEW_ORDER_REQUEST, SAVE_NEW_ORDER_SUCCESS, SAVE_NEW_ORDER_FAILURE,
  SAVE_ORDER_REQUEST, SAVE_ORDER_SUCCESS, SAVE_ORDER_FAILURE,
  TOGGLE_PAID_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS,
} from './actions'

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      switch(action.routeName) {
        case OPERATION:
          return idsDefault
        default:
          return state
      }
    case FETCH_OPERATION_SUCCESS:
      return R.union(R.pluck('_id', action.orders))(state)
    case SAVE_NEW_ORDER_SUCCESS:
      return R.append(action.order._id)(state)
    case DELETE_ORDER_SUCCESS:
      return R.without([ action.order._id ])(state)
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
    case NavigationActions.NAVIGATE:
      switch(action.routeName) {
        case OPERATION:
          return byIdDefault
        default:
          return state
      }
    case FETCH_OPERATION_SUCCESS:
      return R.merge(
        R.compose(
          R.indexBy(R.prop('_id')),
          R.map(evolveOrderProducts),
        )(action.orders),
      )(state)
    case SAVE_NEW_ORDER_SUCCESS:
      return R.assoc(action.order._id, evolveOrderProducts(action.order))(state)
    case SAVE_ORDER_SUCCESS:
      return R.evolve({
        [action.order._id]: {
          products: R.compose(
            R.reject(R.propEq('quantity', 0)),
            R.values,
            R.merge(
              R.__,
              R.compose(
                R.indexBy(R.prop('product')),
                R.prop('products'),
                evolveOrderProducts,
              )(action.order),
            ),
            R.indexBy(R.prop('product')),
          )
        },
      })(state)
    case TOGGLE_PAID_ORDER_SUCCESS:
      return R.evolve({
        [action.order._id]: R.flip(R.merge)(action.order),
      })(state)
    case DELETE_ORDER_SUCCESS:
      return R.dissoc(action.order._id)(state)
    default:
      return state
  }
}

const current = (state = null, action) => {
  switch(action.type) {
    case TOGGLE_ORDER:
      return R.equals(action.id, state) ? null : action.id
    case NavigationActions.NAVIGATE:
      return R.ifElse(
        R.flip(R.contains)([ ORDER ]),
        R.always(state),
        R.always(null),
      )(action.routeName)
    case DELETE_ORDER_SUCCESS:
      return null
    default:
      return state
  }
}

const editingProductsIds = (state = null, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      return R.ifElse(
        R.flip(R.contains)([ ORDER, NEW_ORDER ]),
        R.always([]),
        R.always(null),
      )(action.routeName)
    case ADD_PRODUCT_TO_ORDER:
      return R.append(action.id)(state)
    case REMOVE_PRODUCT_FROM_ORDER:
      return R.without([ action.id ])(state)
    default:
      return state
  }
}

const editingProductsById = (state = null, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      return R.ifElse(
        R.flip(R.contains)([ ORDER, NEW_ORDER ]),
        R.always({}),
        R.always(null),
      )(action.routeName)
    case ADD_PRODUCT_TO_ORDER:
      return R.assoc(action.id, action.quantity)(state)
    case REMOVE_PRODUCT_FROM_ORDER:
      return R.dissoc(action.id)(state)
    case ADD_TO_PRODUCT_QUANTITY:
      return R.evolve({
        [action.id]: R.add(action.quantity),
      })(state)
    case SUBTRACT_TO_PRODUCT_QUANTITY:
      return R.evolve({
        [action.id]: R.subtract(R.__, action.quantity),
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

const preSaving = (state = false, action) => {
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

const saving = (state = false, action) => {
  switch(action.type) {
    case SAVE_NEW_ORDER_REQUEST:
    case SAVE_ORDER_REQUEST:
      return true
    case SAVE_NEW_ORDER_SUCCESS:
    case SAVE_NEW_ORDER_FAILURE:
    case SAVE_ORDER_SUCCESS:
    case SAVE_ORDER_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  ids,
  byId,
  current,
  editingProductsIds,
  editingProductsById,
  creatingUser,
  addingProduct,
  preSaving,
  saving,
})
