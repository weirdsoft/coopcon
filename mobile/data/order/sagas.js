import { put, select, call, all, takeLatest } from 'redux-saga/effects'
import * as R from 'ramda'
import * as api from 'Coopcon/data/api'
import { NavigationActions } from 'react-navigation'
import { getCurrentId } from 'Coopcon/data/operation/selectors'
import { getCreatingUser, getCreatingProductsById, getOrderProductQuantity } from './selectors'
import {
  ADD_PRODUCT_TO_ORDER, hideAddOrderProductDialog,
  SAVE_NEW_ORDER_REQUEST,  receiveNewOrder, failReceiveNewOrder,
  SUBTRACT_TO_PRODUCT_QUANTITY, removeProductFromOrder,
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

function* removeProductQuantityZero({ id }) {
  const quantity = yield select(getOrderProductQuantity, id)

  if (quantity <= 0) {
    yield put(removeProductFromOrder(id))
  }
}

function* orderSaga() {
  yield all([
    takeLatest(ADD_PRODUCT_TO_ORDER, closeAddOrderProductDialog),
    takeLatest(SUBTRACT_TO_PRODUCT_QUANTITY, removeProductQuantityZero),
    takeLatest(SAVE_NEW_ORDER_REQUEST, saveNewOrder),
  ])
}

export default orderSaga
