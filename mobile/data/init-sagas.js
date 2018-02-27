import { put } from 'redux-saga/effects'
import { fetchOperations } from './operation/actions'

export default function* rootSaga() {
  yield put(fetchOperations())
}
