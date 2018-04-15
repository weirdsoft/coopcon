import { put, all, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { fetchOperation } from 'Coopcon/data/operation/actions'
import { OPERATION } from './actions'

function* onOrder({ routeName, params }) {
  if (routeName === OPERATION) {
    yield put(fetchOperation(params.id))
  }
}

function* navigationSaga() {
  yield all([
    takeLatest(NavigationActions.NAVIGATE, onOrder),
  ])
}

export default navigationSaga
