import * as R from 'ramda'
import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { ORDER } from 'Coopcon/data/navigation/actions'
import { FETCH_OPERATION_SUCCESS } from 'Coopcon/data/operation/actions'
import {
  TOGGLE_ORDER, SHOW_ADD_ORDER_PRODUCT_DIALOG, HIDE_ADD_ORDER_PRODUCT_DIALOG, ADD_PRODUCT_TO_ORDER,
} from './actions'

const idsDefault = []
const ids = (state = idsDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_SUCCESS:
      return R.union(R.pluck('_id', action.orders))(state)
    default:
      return state
  }
}

const byIdDefault = {}
const byId = (state = byIdDefault, action) => {
  switch(action.type) {
    case FETCH_OPERATION_SUCCESS:
      return R.merge(
        R.compose(
          R.indexBy(R.prop('_id')),
          R.map(
            R.evolve({
              products: R.map(
                R.evolve({
                  product: R.prop('_id'),
                }),
              ),
            }),
          ),
        )(action.orders),
      )(state)
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

const creatingProducts = (state = null, action) => {
  switch(action.type) {
    case NavigationActions.NAVIGATE:
      if (action.routeName === ORDER) {
        return []
      } else {
        return state
      }
    case ADD_PRODUCT_TO_ORDER:
      return R.append({
        product: action.id,
        quantity: 1,
      })(state)
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

export default combineReducers({
  ids,
  byId,
  current,
  creatingProducts,
  addingProduct,
})
