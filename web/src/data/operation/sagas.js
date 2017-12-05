import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  FETCH_PRODUCER_OPERATIONS_REQUEST, receiveProducerOperations, failReceiveProducerOperations,
  ADD_NEW_OPERATION_REQUEST, receiveNewOperation, failReceiveNewOperation,
} from './actions'
import { getNewOperation } from './selectors'
import { producerOperationsQuery } from './queries'
import { createOperationMutation } from './mutations'

function* fetchProducerOperations({ producerId }) {
  try {
    const { producer } = yield call(api.query, producerOperationsQuery, {
      producerId,
    })
    yield put(receiveProducerOperations(producerId, producer.operations))
  } catch (e) {
    yield put(failReceiveProducerOperations(e.message))
  }
}

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
    takeLatest(FETCH_PRODUCER_OPERATIONS_REQUEST, fetchProducerOperations),
    takeLatest(ADD_NEW_OPERATION_REQUEST, addNewOperation),
  ]
}

export default operationSaga
