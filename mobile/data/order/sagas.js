import { put, select, call, all, takeLatest } from 'redux-saga/effects'
import * as R from 'ramda'
import * as api from 'Coopcon/data/api'
import { NavigationActions } from 'react-navigation'
import { getCurrentId } from 'Coopcon/data/operation/selectors'
import { getCreatingUser, getCreatingProductsById } from './selectors'
import {
  ADD_PRODUCT_TO_ORDER, SAVE_NEW_ORDER_REQUEST, hideAddOrderProductDialog, receiveNewOrder,
  failReceiveNewOrder,
} from './actions'
import { createOrderMutation, addOrderProductMutation } from './mutations'

function* closeAddOrderProductDialog() {
  yield put(hideAddOrderProductDialog())
}

function* saveNewOrder() {
  const operation = yield select(getCurrentId)
  const user = yield select(getCreatingUser)
  const orderProducts = yield select(getCreatingProductsById)

  try {
    // create the order first
    const { order } = yield call(api.mutate, createOrderMutation, {
      order: {
        user,
        operation,
      },
    })

    // then add all the new products
    const products = yield all(R.compose(
      R.values,
      R.mapObjIndexed((quantity, product) =>
        call(api.mutate, addOrderProductMutation, {
          id: order._id,
          orderProduct: {
            product,
            quantity,
          },
        }),
      ),
    )(orderProducts))
    order.products = R.pluck('orderProduct')(products)

    yield put(receiveNewOrder(order))
    yield put(NavigationActions.back())
  } catch(e) {
    yield put(failReceiveNewOrder(e.message))
  }
}

function* orderSaga() {
  yield all([
    takeLatest(ADD_PRODUCT_TO_ORDER, closeAddOrderProductDialog),
    takeLatest(SAVE_NEW_ORDER_REQUEST, saveNewOrder),
  ])
}

export default orderSaga
