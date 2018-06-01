import * as R from 'ramda'
import { createSelector } from 'reselect'
import { getCurrentOperation } from 'Coopcon/data/operation/selectors'
import { getProductsById } from 'Coopcon/data/product/selectors'

export const getOrderIds = (state) => state.order.ids
export const getOrdersById = (state) => state.order.byId
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
export const getCurrentOrderId = (state) => state.order.current
export const isCurrentOrder = (state, id) => R.equals(state.order.current, id)
export const getCurrentOrder = createSelector(
  [ getCurrentOrderId, getOrdersById ],
  R.prop,
)
export const getEditingProductsIds = (state) => state.order.editingProductsIds
export const getEditingProductsById = (state) => state.order.editingProductsById
export const getOrderProductQuantity = (state, id) => state.order.editingProductsById[id]
export const hasEditingProducts = createSelector(
  [ getEditingProductsIds ],
  (products) => R.not(R.isEmpty(products)),
)
export const getOrderAvailableProducts = createSelector(
  [ getCurrentOperation, getEditingProductsIds ],
  (operation, orderProducts) => R.compose(
    R.reject(
      R.flip(R.contains)(orderProducts),
    ),
    R.defaultTo([]),
  )(operation.products),
)
export const hasOrderAvailableProducts = createSelector(
  [ getOrderAvailableProducts ],
  (products) => R.compose(
    R.not,
    R.isEmpty,
  )(products),
)
export const getCreatingUser = (state) => state.order.creatingUser
export const isAddingProduct = (state) => state.order.addingProduct
export const isPreSavingOrder = (state) => state.order.preSaving
export const isSavingOrder = (state) => state.order.saving
