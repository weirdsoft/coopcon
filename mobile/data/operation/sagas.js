import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as api from 'Coopcon/data/api'
import {
  FETCH_OPERATIONS_REQUEST, receiveOperations, failReceiveOperations,
  FETCH_OPERATION_ORDERS_REQUEST, receiveOperationOrders, failReceiveOperationOrders,
} from './actions'
import { operationsQuery, operationOrdersQuery } from './queries'

function* fetchOperation() {
  try {
    const { operations } = yield call(api.query, operationsQuery)
    yield put(receiveOperations(operations))
  } catch(e) {
    yield put(failReceiveOperations(e.message))
  }
}

function* fetchOperationOrders({ id }) {
  try {
    const { operation: { orders } } = yield call(api.query, operationOrdersQuery, {
      id,
    })
    yield put(receiveOperationOrders(id, orders))
  } catch(e) {
    yield put(failReceiveOperationOrders(e.message))
  }
}


function* operationSaga() {
  yield all([
    takeLatest(FETCH_OPERATIONS_REQUEST, fetchOperation),
    takeLatest(FETCH_OPERATION_ORDERS_REQUEST, fetchOperationOrders),
  ])
}

export default operationSaga
