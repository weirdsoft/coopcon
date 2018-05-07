import * as R from 'ramda'
import { createSelector } from 'reselect'

export const getOperations = (state) => state.operation.byId
export const getOperation = (state, id) => state.operation.byId[id]
export const isAddingOperation = (state) => state.operation.isAdding
export const getNewOperation = (state) => state.operation.newOperation
export const getCurrentOperationId = (state) => state.operation.currentId
export const getCurrentOperation = createSelector(
  [ getOperations, getCurrentOperationId ],
  (operations, currentId) => operations[currentId],
)
export const isShowingOperationSidepanel = createSelector(
  [ getCurrentOperationId ],
  (currentId) => currentId != null,
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
