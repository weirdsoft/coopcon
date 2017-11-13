import { fork } from 'redux-saga/effects'
import routeSaga from './route/sagas'
import producerSaga from './producer/sagas'
import productSaga from './product/sagas'

const sagas = [
  routeSaga,
  producerSaga,
  productSaga,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
