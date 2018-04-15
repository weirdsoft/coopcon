import { createSelector } from 'reselect'

export const getOperationIds = (state) => state.operation.ids
export const getOperationsById = (state) => state.operation.byId
export const getOperation = (state, id) => state.operation.byId[id]
export const getCurrentId = (state) => state.operation.current
export const getCurrentOperation = createSelector(
  [ getCurrentId, getOperationsById ],
  (id, operations) => operations[id],
)
