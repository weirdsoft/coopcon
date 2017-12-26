import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  ADD_NEW_OPERATION_REQUEST, receiveNewOperation, failReceiveNewOperation,
} from './actions'
import { getNewOperation } from './selectors'
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
    yield(failReceiveNewOperation(e.message))
  }
}


function* operationSaga() {
  yield [
    takeLatest(ADD_NEW_OPERATION_REQUEST, addNewOperation),
  ]
}

export default operationSaga
