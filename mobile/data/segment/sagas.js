import Expo from 'expo'
import * as R from 'ramda'
import { call, all, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { DEVELOPMENT_ENV } from 'Coopcon/data/config'
import { IDENTIFY, TRACK } from './types'

function* initializeSegment() {
  Expo.Segment.initialize({ androidWriteKey: 's1Fi2mhAQsTNx549PuBeNCq984fga1WI' })
  yield call(sendSegmentEvent, { eventType: IDENTIFY, eventName: '1' })
}

function* sendSegmentEvent({ eventType, eventName, eventData }) {
  yield call(Expo.Segment[eventType], eventName, eventData)
}

const matchSegmentAction = R.compose(
  R.not,
  R.isNil,
  R.path([ 'meta', 'analytics' ]),
)

function* handleAnalyticActions({ meta: { analytics } }) {
  yield call(sendSegmentEvent, analytics)
}

function* handleNavigationActions(action) {
  yield call(sendSegmentEvent, {
    eventType: TRACK,
    eventName: `Navigate to ${action.routeName}`,
  })
}

function* segmentSaga() {
  if (!DEVELOPMENT_ENV) {
    yield all([
      call(initializeSegment),
      takeEvery(matchSegmentAction, handleAnalyticActions),
      takeEvery(NavigationActions.NAVIGATE, handleNavigationActions),
    ])
  }
}

export default segmentSaga
