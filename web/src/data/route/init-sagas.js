import { put, take, select } from 'redux-saga/effects'
import {
  fetchProducers, FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCERS_FAILURE,
} from 'data/producer/actions'
import { getProducers } from 'data/producer/selectors'
import { getCurrentRoute } from 'data/route/selectors'
import { goToOperatives } from './actions'

function* routeInitSaga() {
  yield put(fetchProducers())
  const result = yield take([ FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCERS_FAILURE ])
  const route = yield select(getCurrentRoute)

  if (route == null && result.type === FETCH_PRODUCERS_SUCCESS) {
    const producers = yield select(getProducers)
    const first = producers[0]

    if (first !== null) {
      yield put(goToOperatives(first._id))
    }
  }
}

export default routeInitSaga
