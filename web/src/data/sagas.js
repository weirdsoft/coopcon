import { all, fork } from 'redux-saga/effects'
import authSaga from './auth/sagas'
import producerSaga from './producer/sagas'
import operationSaga from './operation/sagas'
import productSaga from './product/sagas'

const sagas = [
  authSaga,
  producerSaga,
  operationSaga,
  productSaga,
]

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}
