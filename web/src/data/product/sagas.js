import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import {
  FETCH_PRODUCER_PRODUCTS_REQUEST, receiveProducerProducts, failReceiveProducerProducts,
} from './actions'
import { producerProductsQuery } from './queries'

function* fetchProducerProducts({ producerId }) {
  try {
    const response = yield call(api.query, producerProductsQuery, {
      producerId,
    })
    yield put(receiveProducerProducts(producerId, response.producer.products))
  } catch (e) {
    yield put(failReceiveProducerProducts(e.message))
  }
}

function* productSaga() {
  yield [
    takeLatest(FETCH_PRODUCER_PRODUCTS_REQUEST, fetchProducerProducts),
  ]
}

export default productSaga
