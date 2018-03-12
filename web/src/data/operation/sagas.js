import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import * as R from 'ramda'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  ADD_NEW_OPERATION_REQUEST, receiveNewOperation, failReceiveNewOperation,
  FETCH_OPERATION_PRODUCTS_REQUEST, receiveOperationProducts, failReceiveOperationProducts,
  TOGGLE_OPERATION_PRODUCT_STATE_REQUEST, succeedToggleOperationProductState,
  failToggleOperationProductState,
} from './actions'
import { getNewOperation, getCurrentOperation } from './selectors'
import { operationProductsQuery } from './queries'
import {
  createOperationMutation, addOperationProductMutation, removeOperationProductMutation,
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
    takeLatest(FETCH_OPERATION_PRODUCTS_REQUEST, fetchOperationProducts),
    takeLatest(TOGGLE_OPERATION_PRODUCT_STATE_REQUEST, toggleOperationProductState),
  ])
}

export default operationSaga
