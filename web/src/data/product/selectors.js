import * as R from 'ramda'
import { createSelector } from 'reselect'

export const getProductsById = (state) => state.product.byId
export const getProduct = (state, id) => state.product.byId[id]
export const isAddingProduct = (state) => state.product.isAdding
export const getNewProduct = (state) => state.product.newProduct
export const getEditingProductId = (state) => state.product.editingId
export const makeIsEditingProduct = (id) => createSelector(
  [ getEditingProductId ],
  (editingId) => R.equals(id, editingId),
)
export const getEditingProductChanges = (state) => state.product.editingChanges
export const getEditingProduct = createSelector(
  [ getProductsById, getEditingProductId, getEditingProductChanges ],
  (productsById, editingId, editingChanges) => R.merge(
    R.compose(
      R.omit([ '_id', '__typename', 'creationDate' ]),
      R.prop(editingId),
    )(productsById),
    editingChanges,
  ),
)
