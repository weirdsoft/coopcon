import { put, all, takeLatest } from 'redux-saga/effects'
import { ADD_PRODUCT_TO_ORDER, hideAddOrderProductDialog } from 'Coopcon/data/order/actions'

function* closeAddOrderProductDialog() {
  yield put(hideAddOrderProductDialog())
}

function* orderSaga() {
  yield all([
    takeLatest(ADD_PRODUCT_TO_ORDER, closeAddOrderProductDialog),
  ])
}

export default orderSaga
