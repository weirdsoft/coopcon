import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as api from 'Coopcon/data/api'
import {
  FETCH_OPERATIONS_REQUEST, receiveOperations, failReceiveOperations,
  FETCH_OPERATION_REQUEST, receiveOperation, failReceiveOperation,
} from './actions'
import { getCurrentId } from './selectors'
import { operationsQuery, operationOrdersQuery } from './queries'

function* fetchOperations() {
  try {
    const { operations } = yield call(api.query, operationsQuery)
    yield put(receiveOperations(operations))
  } catch(e) {
    yield put(failReceiveOperations(e.message))
  }
}

function* fetchOperation() {
  const id = yield select(getCurrentId)

  try {
    const { operation: { orders, products } } = yield call(api.query, operationOrdersQuery, {
      id,
    })
    yield put(receiveOperation(id, orders, products))
  } catch(e) {
    yield put(failReceiveOperation(e.message))
  }
}


function* operationSaga() {
  yield all([
    takeLatest(FETCH_OPERATIONS_REQUEST, fetchOperations),
    takeLatest(FETCH_OPERATION_REQUEST, fetchOperation),
  ])
}

export default operationSaga
