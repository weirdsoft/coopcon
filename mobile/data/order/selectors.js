import * as R from 'ramda'
import { createSelector } from 'reselect'
import { getCurrentOperation } from 'Coopcon/data/operation/selectors'
import { getProductsById } from 'Coopcon/data/product/selectors'

export const getOrderIds = (state) => state.order.ids
export const getOrder = (state, id) => state.order.byId[id]
export const getOrderWithTotal = createSelector(
  [ getOrder, getProductsById ],
  (order, productsById) => R.assoc(
    'total',
    R.compose(
      R.reduce(R.add, 0),
      R.map(({ product, quantity }) => product.price * quantity),
      R.map(
        R.evolve({
          product: R.flip(R.prop)(productsById),
        }),
      ),
    )(order.products),
  )(order),
)
export const isCurrentOrder = (state, id) => R.equals(state.order.current, id)
export const getCreatingProducts = (state) => state.order.creatingProducts
export const isAddingProduct = (state) => state.order.addingProduct
export const getOrderAvailableProducts = createSelector(
  [ getCurrentOperation, getCreatingProducts ],
  (operation, orderProducts) => R.compose(
    R.map((id) => ({ id })),
    R.reject(
      R.flip(R.contains)(
        R.pluck('product', orderProducts),
      ),
    ),
  )(operation.products),
)
export const hasOrderAvailableProducts = createSelector(
  [ getOrderAvailableProducts ],
  (products) => R.compose(
    R.not,
    R.isEmpty,
  )(products),
)
