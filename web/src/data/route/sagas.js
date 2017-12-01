import { select, put, call, takeLatest } from 'redux-saga/effects'
import { NOT_FOUND } from 'redux-first-router'
import { INDEX, PRODUCT_GALLERY, PRODUCT_ADD, goToIndex, goToOperations } from 'data/route/actions'
import { fetchProducerProducts } from 'data/product/actions'
import { getCurrentId, getSortedProducers } from 'data/producer/selectors'

function* onNotFound() {
    yield put(goToIndex())
}

function* onIndex() {
  const producers = yield select(getSortedProducers)
  const first = producers[0]

  if (first !== null) {
    yield put(goToOperations(first._id))
  }
}

function* onProductGallery() {
  const producerId = yield select(getCurrentId)
  yield put(fetchProducerProducts(producerId))
}

const mapRouteToSaga = {
  [NOT_FOUND]: onNotFound,
  [INDEX]: onIndex,
  [PRODUCT_GALLERY]: onProductGallery,
  [PRODUCT_ADD]: onProductGallery,
}

function* handleRouteChange({ type }) {
  yield call(mapRouteToSaga[type])
}

function* routeSaga() {
  yield [
    takeLatest(Object.keys(mapRouteToSaga), handleRouteChange),
  ]
}

export { mapRouteToSaga }
export default routeSaga
