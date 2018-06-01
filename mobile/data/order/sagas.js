import { put, select, call, take, all, takeLatest } from 'redux-saga/effects'
import * as R from 'ramda'
import * as api from 'Coopcon/data/api'
import { NavigationActions } from 'react-navigation'
import { DISMISS_CONFIRMATION, displayConfirmation } from 'Coopcon/data/confirmation/actions'
import { getCurrentId } from 'Coopcon/data/operation/selectors'
import { ORDER } from 'Coopcon/data/navigation/actions'
import {
  getCreatingUser, getEditingProductsById, getOrderProductQuantity, getCurrentOrderId,
  getCurrentOrder,
} from './selectors'
import {
  ADD_PRODUCT_TO_ORDER, hideAddOrderProductDialog, addProductToOrder,
  SAVE_NEW_ORDER_REQUEST, receiveNewOrder, failReceiveNewOrder, hideSaveOrderDialog,
  SAVE_ORDER_REQUEST, receiveOrder, failReceiveOrder,
  SUBTRACT_TO_PRODUCT_QUANTITY, removeProductFromOrder,
  TOGGLE_PAID_ORDER_REQUEST, receiveTogglePaidOrder, failReceiveTogglePaidOrder,
  DELETE_ORDER_REQUEST, removeOrder, failRemoveOrder,
} from './actions'
import {
  createOrderMutation, addOrderProductMutation, removeOrderProductMutation,
  toggleOrderPaidMutation, deleteOrderMutation,
} from './mutations'


const mutateOrderProduct = R.curry((mutation, id, orderProducts) => R.compose(
  R.values,
  R.mapObjIndexed((quantity, product) => call(api.mutate, mutation, {
    id,
    orderProduct: {
      product,
      quantity,
    },
  })),
)(orderProducts))

const addOrderProducts = mutateOrderProduct(addOrderProductMutation)
const removeOrderProducts = mutateOrderProduct(removeOrderProductMutation)

function* closeAddOrderProductDialog() {
  yield put(hideAddOrderProductDialog())
}

function* saveNewOrder() {
  const operation = yield select(getCurrentId)
  const user = yield select(getCreatingUser)
  const orderProducts = yield select(getEditingProductsById)

  try {
    // create the order first
    const { order } = yield call(api.mutate, createOrderMutation, {
      order: {
        user,
        operation,
      },
    })

    // then add all the new products
    const products = yield all(addOrderProducts(order._id, orderProducts))
    order.products = R.pluck('orderProduct')(products)

    yield put(receiveNewOrder(order))
    yield put(hideSaveOrderDialog())
    yield put(NavigationActions.back())
  } catch(e) {
    yield put(failReceiveNewOrder(e.message))
  }
}

function* saveOrder() {
  const order = yield select(getCurrentOrder)
  const editedProducts = yield select(getEditingProductsById)

  // put together those that we want to modify somehow
  const toModify = R.compose(
    R.reject(R.equals(0)),
    R.mapObjIndexed((quantity, product) => R.compose(
      R.subtract(quantity),
      R.ifElse(
        R.isNil,
        R.always(0),
        R.prop('quantity'),
      ),
      R.find(R.whereEq({ product })),
    )(order.products)),
  )(editedProducts)

  // filter out those that we want to add
  const toAdd = R.filter(R.lt(0))(toModify)

  // filter out those that we want to completely remove or reduce in quantity
  const toRemove = R.merge(
    // the ones that are no longer present
    R.compose(
      R.map(R.prop('quantity')),
      R.indexBy(R.prop('product')),
      R.reject(R.where({
        product: R.contains(R.__, R.keysIn(editedProducts)),
      })),
    )(order.products),
    // the ones to modify negatively
    R.compose(
      R.map(R.negate),
      R.filter(R.gt(0)),
    )(toModify),
  )

  try {
    // then add all the new products
    const products = yield all(R.union(
      addOrderProducts(order._id, toAdd),
      removeOrderProducts(order._id, toRemove),
    ))
    const changedOrder = {
      _id: order._id,
      products: R.pluck('orderProduct')(products),
    }

    yield put(receiveOrder(changedOrder))
    yield put(NavigationActions.back())
  } catch(e) {
    yield put(failReceiveOrder(e.message))
  }
}

function* removeProductQuantityZero({ id }) {
  const quantity = yield select(getOrderProductQuantity, id)

  if (quantity <= 0) {
    yield put(removeProductFromOrder(id))
  }
}

function* togglePaidOrder() {
  const id = yield select(getCurrentOrderId)

  try {
    const { order } = yield call(api.mutate, toggleOrderPaidMutation, {
      id,
    })

    yield put(receiveTogglePaidOrder(order))
  } catch(e) {
    yield put(failReceiveTogglePaidOrder(e.message))
  }
}

function* deleteOrder() {
  const id = yield select(getCurrentOrderId)

  // ask for confirmation before deleting
  yield put(displayConfirmation(
    '¿Seguro que desea eliminar la orden?',
    'Esta acción eliminara la orden definitivamente.',
  ))
  const { confirmed } = yield take(DISMISS_CONFIRMATION)

  if (confirmed) {
    try {
      const { order } = yield call(api.mutate, deleteOrderMutation, {
        id,
      })

      yield put(removeOrder(order))
    } catch(e) {
      yield put(failRemoveOrder(e.message))
    }
  }
}

function* setOrderEditingProducts({ routeName }) {
  if (routeName === ORDER) {
    const order = yield select(getCurrentOrder)

    for (let { product, quantity } of order.products) {
      yield put(addProductToOrder(product, quantity))
    }
  }
}

function* orderSaga() {
  yield all([
    takeLatest(ADD_PRODUCT_TO_ORDER, closeAddOrderProductDialog),
    takeLatest(SUBTRACT_TO_PRODUCT_QUANTITY, removeProductQuantityZero),
    takeLatest(SAVE_NEW_ORDER_REQUEST, saveNewOrder),
    takeLatest(SAVE_ORDER_REQUEST, saveOrder),
    takeLatest(TOGGLE_PAID_ORDER_REQUEST, togglePaidOrder),
    takeLatest(DELETE_ORDER_REQUEST, deleteOrder),
    takeLatest(NavigationActions.NAVIGATE, setOrderEditingProducts),
  ])
}

export default orderSaga
