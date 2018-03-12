import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToProductGallery } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  ADD_NEW_PRODUCT_REQUEST, receiveNewProduct, failReceiveNewProduct,
} from './actions'
import { getNewProduct } from './selectors'
import { createProductMutation } from './mutations'

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
  yield all([
    takeLatest(ADD_NEW_PRODUCT_REQUEST, addNewProduct),
  ])
}

export default productSaga
