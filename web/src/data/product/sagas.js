import { call, put, select, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToProductGallery } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  FETCH_PRODUCER_PRODUCTS_REQUEST, receiveProducerProducts, failReceiveProducerProducts,
  ADD_NEW_PRODUCT_REQUEST, receiveNewProduct, failReceiveNewProduct,
} from './actions'
import { getNewProduct } from './selectors'
import { producerProductsQuery } from './queries'
import { createProductMutation } from './mutations'

function* fetchProducerProducts({ producerId }) {
  try {
    const { producer } = yield call(api.query, producerProductsQuery, {
      producerId,
    })
    yield put(receiveProducerProducts(producerId, producer.products))
  } catch (e) {
    yield put(failReceiveProducerProducts(e.message))
  }
}

function* addNewProduct() {
  const producer = yield select(getCurrentId)
  const newProduct = yield select(getNewProduct)

  try {
    const { product } = yield call(api.mutate, createProductMutation, {
      product: {
        producer,
        ...newProduct,
      },
    })
    yield put(receiveNewProduct(producer, product))
    yield put(goToProductGallery(producer))
  } catch(e) {
    yield(failReceiveNewProduct(e.message))
  }
}

function* productSaga() {
  yield [
    takeLatest(FETCH_PRODUCER_PRODUCTS_REQUEST, fetchProducerProducts),
    takeLatest(ADD_NEW_PRODUCT_REQUEST, addNewProduct),
  ]
}

export default productSaga
