import Expo from 'expo'
import * as R from 'ramda'
import { call, select, all, takeEvery } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { DEVELOPMENT_ENV } from 'Coopcon/data/config'
import { getCurrentRoute } from 'Coopcon/data/navigation/selectors'
import { IDENTIFY, TRACK, TRACK_WITH_PROPS } from './types'

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

function* handleNavigationActions() {
  const { routeName, params } = yield select(getCurrentRoute)
  const event = {
    eventName: `Navigate to ${routeName}`,
  }

  if (R.isNil(params)) {
    event.eventType = TRACK
  } else {
    event.eventType = TRACK_WITH_PROPS
    event.eventData = params
  }

  yield call(sendSegmentEvent, event)
}

function* segmentSaga() {
  if (!DEVELOPMENT_ENV) {
    yield all([
      call(initializeSegment),
      takeEvery(matchSegmentAction, handleAnalyticActions),
      takeEvery([ NavigationActions.NAVIGATE, NavigationActions.BACK ], handleNavigationActions),
    ])
  }
}

export default segmentSaga
