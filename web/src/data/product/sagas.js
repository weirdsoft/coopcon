import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import { goToProductGallery } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import {
  ADD_NEW_PRODUCT_REQUEST, receiveNewProduct, failReceiveNewProduct,
  EDIT_PRODUCT_REQUEST, receiveEditedProduct, failReceiveEditedProduct,
} from './actions'
import { getNewProduct, getEditingProductId, getEditingProduct } from './selectors'
import { createProductMutation, editProductMutation } from './mutations'

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
    yield put(failReceiveNewProduct(e.message))
  }
}

function* editProduct() {
  const producer = yield select(getCurrentId)
  const id = yield select(getEditingProductId)
  const editingProduct = yield select(getEditingProduct)

  try {
    const { product } = yield call(api.mutate, editProductMutation, {
      id,
      product: {
        producer,
        ...editingProduct,
      },
    })

    yield put(receiveEditedProduct(product))
    yield put(goToProductGallery(producer))
  } catch(e) {
    yield put(failReceiveEditedProduct(e.message))
  }
}

function* productSaga() {
  yield all([
    takeLatest(ADD_NEW_PRODUCT_REQUEST, addNewProduct),
    takeLatest(EDIT_PRODUCT_REQUEST, editProduct),
  ])
}

export default productSaga
