import { fork, all } from 'redux-saga/effects'
import operationSagas from './operation/sagas'

const sagas = [
  operationSagas,
]

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}
