import { fork } from 'redux-saga/effects'
import producerSaga from './producer/sagas'
import operationSaga from './operation/sagas'
import productSaga from './product/sagas'

const sagas = [
  producerSaga,
  operationSaga,
  productSaga,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
