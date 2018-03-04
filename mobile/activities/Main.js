import { StackNavigator } from 'react-navigation'
import Home from './Home'

export default StackNavigator(
  {
    Home: {
      screen: Home,
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
