import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import * as R from 'ramda'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  ADD_NEW_OPERATION_REQUEST, receiveNewOperation, failReceiveNewOperation,
  UPDATE_OPERATION_REQUEST, receiveUpdatedOperation, failReceiveUpdatedOperation,
  FETCH_OPERATION_PRODUCTS_REQUEST, receiveOperationProducts, failReceiveOperationProducts,
  FETCH_OPERATION_TOTALS_REQUEST, receiveOperationTotals, failReceiveOperationTotals,
  TOGGLE_OPERATION_PRODUCT_STATE_REQUEST, succeedToggleOperationProductState,
  failToggleOperationProductState,
} from './actions'
import {
  getNewOperation, getEditingOperation, getCurrentOperationId, getCurrentOperation,
} from './selectors'
import { operationProductsQuery, operationTotalsQuery } from './queries'
import {
  createOperationMutation, updateOperationMutation, addOperationProductMutation,
  removeOperationProductMutation,
} from './mutations'

function* addNewOperation() {
  const producer = yield select(getCurrentId)
  const newOperation = yield select(getNewOperation)

  try {
    const { operation } = yield call(api.mutate, createOperationMutation, {
      operation: {
        producer,
        ...newOperation,
      },
    })
    yield put(receiveNewOperation(producer, operation))
    yield put(goToOperations(producer))
  } catch(e) {
    yield put(failReceiveNewOperation(e.message))
  }
}

function* updateOperation() {
  const producer = yield select(getCurrentId)
  const id = yield select(getCurrentOperationId)
  const editingOperation = yield select(getEditingOperation)

  try {
    const { operation } = yield call(api.mutate, updateOperationMutation, {
      id,
      operation: {
        producer,
        ...editingOperation,
      },
    })
    yield put(receiveUpdatedOperation(operation))
    yield put(goToOperations(producer))
  } catch(e) {
    yield put(failReceiveUpdatedOperation(e.message))
  }
}

function* fetchOperationProducts({ id }) {
  try {
    const { operation: { products } } = yield call(api.query, operationProductsQuery, {
      id,
    })
    yield put(receiveOperationProducts(id, products))
  } catch(e) {
    yield put(failReceiveOperationProducts(e.message))
  }
}

function* fetchOperationTotals({ id }) {
  try {
    const { operation: { totals } } = yield call(api.query, operationTotalsQuery, {
      id,
    })
    yield put(receiveOperationTotals(id, totals))
  } catch(e) {
    yield put(failReceiveOperationTotals(e.message))
  }
}

function* toggleOperationProductState({ productId }) {
  const operation = yield select(getCurrentOperation)

  try {
    const mutation = R.ifElse(
      R.contains(productId),
      R.always(removeOperationProductMutation),
      R.always(addOperationProductMutation),
    )(operation.products)

    const { result } = yield call(api.mutate, mutation, {
      id: operation._id,
      productId,
    })

    if (result) {
      yield put(succeedToggleOperationProductState(operation._id, productId))
    } else {
      yield put(failToggleOperationProductState(
        productId,
        `Couldn't toggle ${productId}'s state`,
      ))
    }
  } catch(e) {
    yield put(failToggleOperationProductState(productId, e.message))
  }
}

function* operationSaga() {
  yield all([
    takeLatest(ADD_NEW_OPERATION_REQUEST, addNewOperation),
    takeLatest(UPDATE_OPERATION_REQUEST, updateOperation),
    takeLatest(FETCH_OPERATION_PRODUCTS_REQUEST, fetchOperationProducts),
    takeLatest(FETCH_OPERATION_TOTALS_REQUEST, fetchOperationTotals),
    takeLatest(TOGGLE_OPERATION_PRODUCT_STATE_REQUEST, toggleOperationProductState),
  ])
}

export default operationSaga
