import * as R from 'ramda'
import moment from 'moment'
import { combineReducers } from 'redux'
import {
  OPERATION_ADD, OPERATION_EDIT, OPERATION_PRODUCTS, OPERATION_TOTALS, allRoutes,
} from 'data/route/actions'
import { FETCH_PRODUCER_SUCCESS } from 'data/producer/actions'
import {
  CHANGE_NEW_OPERATION, ADD_NEW_OPERATION_SUCCESS,
  CHANGE_EDITING_OPERATION, UPDATE_OPERATION_SUCCESS,
  FETCH_OPERATION_PRODUCTS_SUCCESS,
  FETCH_OPERATION_TOTALS_SUCCESS, TOGGLE_OPERATION_PRODUCT_STATE_REQUEST,
  TOGGLE_OPERATION_PRODUCT_STATE_SUCCESS, TOGGLE_OPERATION_PRODUCT_STATE_FAILURE,
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
    case UPDATE_OPERATION_SUCCESS:
      return R.evolve({
        [action.operation._id]: R.compose(R.merge(R.__, action.operation)),
      })(state)
    case FETCH_OPERATION_PRODUCTS_SUCCESS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          products: action.products.map((product) => product._id),
        },
      }
    case FETCH_OPERATION_TOTALS_SUCCESS:
      return R.evolve({
        [action.id]: R.assoc('totals', action.totals),
      })(state)
    case TOGGLE_OPERATION_PRODUCT_STATE_SUCCESS:
      return R.evolve({
        [action.id]: {
          products: R.symmetricDifference([ action.productId ]),
        },
      }, state)
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

const consistentDateReducer = (
  actionType, dateName, previousDateNames = [],
) => (state = null, action) => {
  switch(action.type) {
    case actionType:
      return R.ifElse(
        R.has(dateName),
        R.prop(dateName), // easiest scenario, we have our date
        R.compose( // otherwise we have to check for previous dates
          R.cond([
            [ R.isNil, R.always(state) ], // if the date is null, just return the state
            [
              R.compose(
                R.invoker(1, 'isAfter')(state), // return the date if it's after the current
                moment,
              ),
              R.identity,
            ],
            [ R.T, R.always(state) ],
          ]),
          R.head, // there's gonna be only one, if there's any
          R.values, // only need their values
          R.pick(previousDateNames), // get the names from the changes
        ),
      )(action.change)
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const newOperation = combineReducers({
  publishDate: consistentDateReducer(CHANGE_NEW_OPERATION, 'publishDate'),
  closeDate: consistentDateReducer(CHANGE_NEW_OPERATION, 'closeDate', [ 'publishDate' ]),
  deliveryDate: consistentDateReducer(
    CHANGE_NEW_OPERATION,
    'deliveryDate',
    [ 'publishDate', 'closeDate' ],
  ),
})

const currentId = (state = null, action) => {
  switch(action.type) {
    case OPERATION_EDIT:
    case OPERATION_PRODUCTS:
    case OPERATION_TOTALS:
      return action.payload.id
    default:
      if (allRoutes.includes(action.type)) {
        return null
      } else {
        return state
      }
  }
}

const isEditing = (state = false, action) => {
  switch(action.type) {
    case OPERATION_EDIT:
      return true
    default:
      if (allRoutes.includes(action.type)) {
        return false
      } else {
        return state
      }
  }
}

const editingChanges = combineReducers({
  publishDate: consistentDateReducer(CHANGE_EDITING_OPERATION, 'publishDate'),
  closeDate: consistentDateReducer(CHANGE_EDITING_OPERATION, 'closeDate', [ 'publishDate' ]),
  deliveryDate: consistentDateReducer(
    CHANGE_EDITING_OPERATION,
    'deliveryDate',
    [ 'publishDate', 'closeDate' ],
  ),
})

const changedProducts = (state = null, action) => {
  switch(action.type) {
    case OPERATION_PRODUCTS:
      return []
    case TOGGLE_OPERATION_PRODUCT_STATE_REQUEST:
    case TOGGLE_OPERATION_PRODUCT_STATE_SUCCESS:
    case TOGGLE_OPERATION_PRODUCT_STATE_FAILURE:
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
  isEditing,
  editingChanges,
  changedProducts,
})
