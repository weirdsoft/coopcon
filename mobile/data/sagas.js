import { fork, all } from 'redux-saga/effects'
import operationSagas from './operation/sagas'
import navigationSagas from './navigation/sagas'

const sagas = [
  operationSagas,
  navigationSagas,
]

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}
