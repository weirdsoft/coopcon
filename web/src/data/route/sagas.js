import { select, put, takeLatest } from 'redux-saga/effects'
import { PRODUCT_GALLERY } from 'data/route/actions'
import { fetchProducerProducts } from 'data/product/actions'
import { getCurrentId } from 'data/producer/selectors'

function* onProductGallery() {
  const producerId = yield select(getCurrentId)
  yield put(fetchProducerProducts(producerId))
}

function* routeSaga() {
  yield [
    takeLatest(PRODUCT_GALLERY, onProductGallery),
  ]
}

export default routeSaga
