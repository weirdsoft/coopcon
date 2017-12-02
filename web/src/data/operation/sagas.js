import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import {
  FETCH_PRODUCER_OPERATIONS_REQUEST, receiveProducerOperations, failReceiveProducerOperations,
} from './actions'
import { producerOperationsQuery } from './queries'

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

function* operationSaga() {
  yield [
    takeLatest(FETCH_PRODUCER_OPERATIONS_REQUEST, fetchProducerOperations),
  ]
}

export default operationSaga
