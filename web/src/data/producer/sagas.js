import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import {
  FETCH_PRODUCERS_REQUEST, receiveProducers, failReceiveProducers,
  FETCH_PRODUCER_REQUEST, receiveProducer, failReceiveProducer,
  CREATE_NEW_PRODUCER, addProducer, failAddProducer,
} from './actions'
import { getNewProducer } from './selectors'
import { allProducersQuery, producerQuery } from './queries'
import { createProducerMutation } from './mutations'

function* fetchProducers() {
  try {
    const response = yield call(api.query, allProducersQuery)
    yield put(receiveProducers(response.producers))
  } catch (e) {
    yield put(failReceiveProducers(e.message))
  }
}

function* fetchProducer({ id }) {
  try {
    const { producer } = yield call(api.query, producerQuery, {
      id,
    })
    yield put(receiveProducer(producer))
  } catch (e) {
    yield put(failReceiveProducer(e.message))
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
  yield all([
    takeLatest(FETCH_PRODUCERS_REQUEST, fetchProducers),
    takeLatest(FETCH_PRODUCER_REQUEST, fetchProducer),
    takeLatest(CREATE_NEW_PRODUCER, createProducer),
  ])
}

export default producerSaga
