import { fork } from 'redux-saga/effects'
import producerSaga from './producer/sagas'

const sagas = [
  producerSaga,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
