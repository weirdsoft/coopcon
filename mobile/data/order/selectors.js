import * as R from 'ramda'
import { createSelector } from 'reselect'
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
