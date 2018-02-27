import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as api from 'Coopcon/data/api'
import { FETCH_OPERATIONS_REQUEST, receiveOperations, failReceiveOperations } from './actions'
import { operationsQuery } from './queries'

function* fetchOperation() {
  try {
    const { operations } = yield call(api.query, operationsQuery)
    yield put(receiveOperations(operations))
  } catch(e) {
    yield put(failReceiveOperations(e.message))
  }
}

function* operationSaga() {
  yield all([
    takeLatest(FETCH_OPERATIONS_REQUEST, fetchOperation),
  ])
}

export default operationSaga
