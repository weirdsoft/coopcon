import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as api from 'data/api'
import {
  FETCH_USER_REQUEST, receiveUserSuccess, receiveUserFailure,
  AUTHORIZE_USER_REQUEST, authorizeUserSuccess, authorizeUserFailure,
} from './actions'
import { userQuery } from './queries'

function* fetchUser() {
  try {
    const { me } = yield call(api.query, userQuery)
    yield put(receiveUserSuccess(me))
  } catch (e) {
    yield put(receiveUserFailure(e.message))
  }
}

function* authorizeUser({ tokenId }) {
  try {
    const { authToken } = yield call(api.auth, tokenId)

    window.localStorage.setItem(api.AUTH_TOKEN_KEY, authToken)
    yield put(authorizeUserSuccess())
  } catch (e) {
    yield put(authorizeUserFailure(e.message))
  }
}

function* authSaga() {
  yield all([
    takeLatest(FETCH_USER_REQUEST, fetchUser),
    takeLatest(AUTHORIZE_USER_REQUEST, authorizeUser),
  ])
}

export default authSaga
