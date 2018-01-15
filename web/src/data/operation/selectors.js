import { createSelector } from 'reselect'

export const getOperations = (state) => state.operation.byId
export const getOperation = (state, id) => state.operation.byId[id]
export const isAddingOperation = (state) => state.operation.isAdding
export const getNewOperation = (state) => state.operation.newOperation
export const getCurrentOperationId = (state) => state.operation.currentId
export const isShowingOperationProducts = createSelector(
  [ getCurrentOperationId ],
  (currentId) => currentId != null,
)
