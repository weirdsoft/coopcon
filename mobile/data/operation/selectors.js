import * as R from 'ramda'
import moment from 'moment'
import { createSelector } from 'reselect'

export const isLoadingOperations = (state) => state.operation.loading
export const getOperationIds = (state) => state.operation.ids
export const getOperationsById = (state) => state.operation.byId

const idWithStatus = R.curry((status, { _id, publishDate }) => ({ _id, publishDate, status }))
export const OPERATION_STATUS = {
  STARTED: 'started',
  IN_DELIVERY: 'delivery',
  FINISHED: 'finished',
}
export const getOperationIdsByStatus = createSelector(
  [ getOperationsById ],
  R.compose(
    R.merge({
      [OPERATION_STATUS.STARTED]: [],
      [OPERATION_STATUS.IN_DELIVERY]: [],
      [OPERATION_STATUS.FINISHED]: [],
    }),
    R.map(R.pluck('_id')),
    R.map(R.sort(R.descend(R.prop('publishDate')))),
    R.groupBy(R.prop('status')),
    R.map(
      R.cond([
        [
          R.compose(R.lt(moment()), moment, R.prop('closeDate')),
          idWithStatus(OPERATION_STATUS.STARTED),
        ],
        [
          R.compose(R.lt(moment()), moment, R.prop('deliveryDate')),
          idWithStatus(OPERATION_STATUS.IN_DELIVERY),
        ],
        [ R.T, idWithStatus(OPERATION_STATUS.FINISHED) ],
      ]),
    ),
    R.values,
  ),
)
export const getOperation = (state, id) => state.operation.byId[id]
export const getCurrentId = (state) => state.operation.current
export const getCurrentOperation = createSelector(
  [ getCurrentId, getOperationsById ],
  (id, operations) => operations[id],
)
