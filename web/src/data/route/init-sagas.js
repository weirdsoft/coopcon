import { all, call, select, put, actionChannel, take } from 'redux-saga/effects'
import { NOT_FOUND } from 'redux-first-router'
import {
  FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCER_SUCCESS, fetchProducers, fetchProducer,
} from 'data/producer/actions'
import { getCurrentId, getSortedProducers } from 'data/producer/selectors'
import {
  changeEditingOperation, fetchOperationProducts, fetchOperationTotals,
} from 'data/operation/actions'
import { getCurrentOperationId, getCurrentOperation } from 'data/operation/selectors'
import { AUTHORIZE_USER_SUCCESS, authorizeUser } from 'data/auth/actions'
import { getUser } from 'data/auth/selectors'
import {
  INDEX, OPERATIONS, OPERATION_ADD, OPERATION_EDIT, OPERATION_PRODUCTS, OPERATION_TOTALS,
  PRODUCT_GALLERY, PRODUCT_ADD, PRODUCT_EDIT,
  goToLogin, goToIndex, goToOperations,
} from './actions'
import { getCurrentRoute } from './selectors'

function sagaWithParameters(saga, ...parameterEffects) {
  let previousParameters = []

  return function* () {
    const parameters = yield all(parameterEffects)
    const differentParameters = parameters.some((current, i) => (
      current !== previousParameters[i]
    ))

    if (differentParameters) {
      previousParameters = parameters
      yield call(saga, ...parameters)
    }
  }
}

function* onNotFound() {
  yield put(goToIndex())
}

function* onIndex() {
  const producers = yield select(getSortedProducers)
  const first = producers[0]

  if (first != null) {
    yield put(goToOperations(first._id))
  }
}

const onProducerAdmin = sagaWithParameters(
  function* (producerId) {
    // next fetch the specific producer for url
    yield put(fetchProducer(producerId))
    yield take(FETCH_PRODUCER_SUCCESS)
  },
  select(getCurrentId),
)

const onOperationEdit = function* () {
  yield call(onProducerAdmin)

  const operation = yield select(getCurrentOperation)
  yield put(changeEditingOperation(operation))
}

const onOperationsProducts = sagaWithParameters(
  function* (operationId) {
    yield call(onProducerAdmin)
    yield put(fetchOperationProducts(operationId))
  },
  select(getCurrentOperationId),
)

const onOperationsTotals = sagaWithParameters(
  function* (operationId) {
    yield call(onProducerAdmin)
    yield put(fetchOperationTotals(operationId))
  },
  select(getCurrentOperationId),
)

const mapRouteToSaga = {
  [NOT_FOUND]: onNotFound,
  [INDEX]: onIndex,
  [OPERATIONS]: onProducerAdmin,
  [OPERATION_ADD]: onProducerAdmin,
  [OPERATION_EDIT]: onOperationEdit,
  [OPERATION_PRODUCTS]: onOperationsProducts,
  [OPERATION_TOTALS]: onOperationsTotals,
  [PRODUCT_GALLERY]: onProducerAdmin,
  [PRODUCT_ADD]: onProducerAdmin,
  [PRODUCT_EDIT]: onProducerAdmin,
}

function* routeSaga() {
  let user = null

  while(true) {
    yield put(authorizeUser())
    yield take (AUTHORIZE_USER_SUCCESS)
    user = yield select(getUser)

    if (user.role !== 'admin') {
      yield put(goToLogin())
      yield take('*')
    } else {
      break
    }
  }

  // fetch the producers
  yield put(fetchProducers())
  yield take(FETCH_PRODUCERS_SUCCESS)

  const channel = yield actionChannel(Object.keys(mapRouteToSaga))

  do {
    // take the current route
    let route = yield select(getCurrentRoute)

    yield call(mapRouteToSaga[route])

    // wait for the next route change
    yield take(channel)
  } while(true)
}

export default routeSaga
