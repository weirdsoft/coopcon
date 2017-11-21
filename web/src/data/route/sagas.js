import { select, put, call, takeLatest } from 'redux-saga/effects'
import { INDEX, PRODUCT_GALLERY, PRODUCT_ADD, goToOperatives } from 'data/route/actions'
import { fetchProducerProducts } from 'data/product/actions'
import { getCurrentId, getProducers } from 'data/producer/selectors'

function* onIndex() {
  const producers = yield select(getProducers)
  const first = producers[0]

  if (first !== null) {
    yield put(goToOperatives(first._id))
  }
}

function* onProductGallery() {
  const producerId = yield select(getCurrentId)
  yield put(fetchProducerProducts(producerId))
}

const mapRouteToSaga = {
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
