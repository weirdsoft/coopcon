import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import {
  FETCH_PRODUCERS_REQUEST, receiveProducers, failReceiveProducers,
  CREATE_NEW_PRODUCER, addProducer, failAddProducer,
} from './actions'
import { getNewProducer } from './selectors'
import { allProducersQuery } from './queries'
import { createProducerMutation } from './mutations'

function* fetchProducers() {
  try {
    const response = yield call(api.query, allProducersQuery)
    yield put(receiveProducers(response.producers))
  } catch (e) {
    yield put(failReceiveProducers(e.message))
  }
}

function* createProducer() {
  const newProducer = yield select(getNewProducer)

  try {
    const { producer } = yield call(api.mutate, createProducerMutation, {
      producer: newProducer,
    })
    yield put(addProducer(producer))
  } catch(error) {
    yield put(failAddProducer(error.message))
  }
}

function* producerSaga() {
  yield [
    takeLatest(FETCH_PRODUCERS_REQUEST, fetchProducers),
    takeLatest(CREATE_NEW_PRODUCER, createProducer),
  ]
}

export default producerSaga
