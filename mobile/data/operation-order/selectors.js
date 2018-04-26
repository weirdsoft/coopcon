import * as R from 'ramda'
import { createSelector } from 'reselect'
import { getCurrentOperation } from 'Coopcon/data/operation/selectors'
import { getOrdersById } from 'Coopcon/data/order/selectors'

export const getOperationOrdersFilter = (state) => state.operationOrder.filter
export const getCurrentOperationFilteredOrders = createSelector(
  [ getCurrentOperation, getOrdersById, getOperationOrdersFilter ],
  (operation, orders, filter) =>  R.compose(
    R.defaultTo([]),
    R.when(
      R.always(R.prop('unpaid')(filter)),
      R.compose(
        R.pluck('_id'),
        R.reject(R.prop('paid')),
        R.map(R.flip(R.prop)(orders)),
      ),
    ),
  )(operation.orders),
)
