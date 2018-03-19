import { NavigationActions } from 'react-navigation'

export const HOME = 'navigation/home'
export const OPERATION = 'navigation/operation'
export const ORDER = 'navigation/order'

export const goToOperation = (id) => NavigationActions.navigate({
  routeName: OPERATION,
  params: { id },
})

export const goToOrder = () => NavigationActions.navigate({
  routeName: ORDER,
})
