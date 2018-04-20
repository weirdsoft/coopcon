import Expo from 'expo'
import * as R from 'ramda'
import { call, all, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { IDENTIFY, TRACK } from './types'

function* initializeSegment() {
  Expo.Segment.initialize({ androidWriteKey: 's1Fi2mhAQsTNx549PuBeNCq984fga1WI' })
  yield call(sendSegmentEvent, { eventType: IDENTIFY, eventData: [ '1' ] })
}

const matchSegmentAction = R.compose(
  R.not,
  R.isNil,
  R.path([ 'meta', 'analytics' ]),
)

function* sendSegmentEvent(analytics) {
  yield call(Expo.Segment[analytics.eventType], ...analytics.eventData)
}


function* handleAnalyticActions({ meta: { analytics } }) {
  yield call(sendSegmentEvent, analytics)
}

function* handleNavigationActions(action) {
  yield call(sendSegmentEvent, {
    eventType: TRACK,
    eventData: [ `Navigate to ${action.routeName}` ],
  })
}

function* segmentSaga() {
  yield all([
    call(initializeSegment),
    takeEvery(matchSegmentAction, handleAnalyticActions),
    takeEvery(NavigationActions.NAVIGATE, handleNavigationActions),
  ])
}

export default segmentSaga
