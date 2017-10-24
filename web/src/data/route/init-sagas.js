import { put } from 'redux-saga/effects'
import { fetchProducers } from 'data/producer/actions'

function* routeInitSaga() {
  yield put(fetchProducers())
}

export default routeInitSaga
