import { put, take, select, call } from 'redux-saga/effects'
import {
  fetchProducers, FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCERS_FAILURE,
} from 'data/producer/actions'
import { getCurrentRoute } from 'data/route/selectors'
import { mapRouteToSaga } from './sagas'

function* routeInitSaga() {
  yield put(fetchProducers())
  const result = yield take([ FETCH_PRODUCERS_SUCCESS, FETCH_PRODUCERS_FAILURE ])

  if (result.type === FETCH_PRODUCERS_SUCCESS) {
    const route = yield select(getCurrentRoute)
    yield call(mapRouteToSaga[route])
  }
}

export default routeInitSaga
