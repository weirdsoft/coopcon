import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import {
  AUTHORIZE_USER_REQUEST, receiveAuthorizedUserSuccess, receiveAuthorizedUserFailure,
} from './actions'
import { userQuery } from './queries'

function* authorizeUser() {
  try {
    const { me } = yield call(api.query, userQuery)
    yield put(receiveAuthorizedUserSuccess(me))
  } catch (e) {
    yield put(receiveAuthorizedUserFailure(e.message))
  }
}

function* authSaga() {
  yield all([
    takeLatest(AUTHORIZE_USER_REQUEST, authorizeUser),
  ])
}

export default authSaga
