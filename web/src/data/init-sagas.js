import { all, fork } from 'redux-saga/effects'
import routeInitSaga from './route/init-sagas'

const sagas = [
  routeInitSaga,
]

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}
