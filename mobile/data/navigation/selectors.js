import { createSelector } from 'reselect'

export const getMainStack = (state) => state.navigation.mainStack
export const getCurrentRoute = createSelector(
  [ getMainStack ],
  (mainStack) => mainStack.routes[mainStack.index],
)
