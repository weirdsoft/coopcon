import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  ADD_NEW_OPERATION_REQUEST, receiveNewOperation, failReceiveNewOperation,
  FETCH_OPERATION_PRODUCTS_REQUEST, receiveOperationProducts, failReceiveOperationProducts,
} from './actions'
import { getNewOperation } from './selectors'
import { operationProductsQuery } from './queries'
import { createOperationMutation } from './mutations'

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

function* operationSaga() {
  yield [
    takeLatest(ADD_NEW_OPERATION_REQUEST, addNewOperation),
    takeLatest(FETCH_OPERATION_PRODUCTS_REQUEST, fetchOperationProducts),
  ]
}

export default operationSaga
