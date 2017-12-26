import { all, call, select, put, actionChannel, take } from 'redux-saga/effects'
import { NOT_FOUND } from 'redux-first-router'
import {
  INDEX, OPERATIONS, OPERATION_ADD, OPERATION_PRODUCTS, PRODUCT_GALLERY, PRODUCT_ADD, goToIndex,
  goToOperations,
} from 'data/route/actions'
import { getCurrentId, getSortedProducers } from 'data/producer/selectors'
import { FETCH_PRODUCERS_SUCCESS, fetchProducers, fetchProducer } from 'data/producer/actions'
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

  if (first !== null) {
    yield put(goToOperations(first._id))
  }
}

const onProducerAdmin = sagaWithParameters(
  function* (producerId) {
    yield put(fetchProducer(producerId))
  },
  select(getCurrentId),
)

const mapRouteToSaga = {
  [NOT_FOUND]: onNotFound,
  [INDEX]: onIndex,
  [OPERATIONS]: onProducerAdmin,
  [OPERATION_ADD]: onProducerAdmin,
  [OPERATION_PRODUCTS]: onProducerAdmin,
  [PRODUCT_GALLERY]: onProducerAdmin,
  [PRODUCT_ADD]: onProducerAdmin,
}

function* routeSaga() {
  // fetch producers on init
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
