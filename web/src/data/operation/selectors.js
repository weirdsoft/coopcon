export const getOperation = (state, id) => state.operation.byId[id]
export const isAddingOperation = (state) => state.operation.isAdding
export const getNewOperation = (state) => state.operation.newOperation
