import { fork, all } from 'redux-saga/effects'
import operationSagas from './operation/sagas'
import orderSagas from './order/sagas'
import navigationSagas from './navigation/sagas'

const sagas = [
  operationSagas,
  orderSagas,
  navigationSagas,
]

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}
