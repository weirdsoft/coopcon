import { StackNavigator } from 'react-navigation'
import Home from 'Coopcon/activities/Home'
import Operation from 'Coopcon/activities/Operation'
import Order from 'Coopcon/activities/Order'
import { HOME, OPERATION, ORDER } from './actions'

export const MainStack = StackNavigator(
  {
    [HOME]: {
      screen: Home,
    },
    [OPERATION]: {
      screen: Operation,
    },
    [ORDER]: {
      screen: Order,
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007bff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
)
