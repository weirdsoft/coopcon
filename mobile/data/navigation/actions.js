import { NavigationActions } from 'react-navigation'

export const HOME = 'navigation/home'
export const OPERATION = 'navigation/operation'

export const goToOperation = (id) => NavigationActions.navigate({
  routeName: OPERATION,
  params: { id },
})
