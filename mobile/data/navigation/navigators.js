import { StackNavigator } from 'react-navigation'
import Home from 'Coopcon/activities/Home'
import Operation from 'Coopcon/activities/Operation'
import EditOrder from 'Coopcon/activities/EditOrder'
import CreateOrder from 'Coopcon/activities/CreateOrder'
import { HOME, OPERATION, ORDER, NEW_ORDER } from './actions'

export const MainStack = StackNavigator(
  {
    [HOME]: {
      screen: Home,
    },
    [OPERATION]: {
      screen: Operation,
    },
    [ORDER]: {
      screen: EditOrder,
    },
    [NEW_ORDER]: {
      screen: CreateOrder,
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
