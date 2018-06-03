import * as R from 'ramda'
import { createSelector } from 'reselect'

export const getOperations = (state) => state.operation.byId
export const getOperation = (state, id) => state.operation.byId[id]
export const isAddingOperation = (state) => state.operation.isAdding
export const getNewOperation = (state) => state.operation.newOperation
export const getCurrentOperationId = (state) => state.operation.currentId
export const getCurrentOperation = createSelector(
  [ getCurrentOperationId, getOperations ],
  R.prop,
)
export const getChangedProducts = (state) => state.operation.changedProducts
export const getSelectedProducts = createSelector(
  [ getCurrentOperation, getChangedProducts ],
  ({ products }, changedProducts) => R.symmetricDifference(
    R.defaultTo([], products), changedProducts,
  ),
)
export const makeIsProductInOperation = () => createSelector(
  [ getSelectedProducts , (_, productId) => productId ],
  (products, productId) => R.contains(productId, products),
)
export const isEditingOperation = (state) => state.operation.isEditing
export const getEditingOperation = (state) => state.operation.editingChanges
export const isShowingOperationSidepanel = createSelector(
  [ getCurrentOperationId, isEditingOperation ],
  R.both(
    R.compose(R.not, R.isNil, R.nthArg(0)),
    R.compose(R.not, R.nthArg(1)),
  ),
)
