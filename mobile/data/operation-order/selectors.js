import * as R from 'ramda'
import { createSelector } from 'reselect'
import { getCurrentOperation } from 'Coopcon/data/operation/selectors'
import { getOrdersById } from 'Coopcon/data/order/selectors'

export const getOperationOrdersFilter = (state) => state.operationOrder.filter
const unpaidLens = R.lensProp('unpaid')
const searchLens = R.lensProp('searchTerm')
export const getCurrentOperationFilteredOrders = createSelector(
  [ getCurrentOperation, getOrdersById, getOperationOrdersFilter ],
  (operation, orders, filter) =>  R.compose(
    R.pluck('_id'),
    R.when(
      R.always(R.compose(
        R.not,
        R.either(R.isEmpty, R.isNil),
        R.view(searchLens),
      )(filter)),
      R.filter(R.compose(
        R.test(new RegExp(R.view(searchLens)(filter), 'i')),
        R.prop('user'),
      )),
    ),
    R.when(
      R.always(R.view(unpaidLens)(filter)),
      R.reject(R.prop('paid')),
    ),
    R.map(R.flip(R.prop)(orders)),
    R.defaultTo([]),
  )(operation.orders),
)
