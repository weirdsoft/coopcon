import { StackNavigator } from 'react-navigation'
import Home from 'Coopcon/activities/Home'
import Operation from 'Coopcon/activities/Operation'
import { HOME, OPERATION } from './actions'

export const MainStack = StackNavigator(
  {
    [HOME]: {
      screen: Home,
    },
    [OPERATION]: {
      screen: Operation,
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
