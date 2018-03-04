import { StackNavigator } from 'react-navigation'
import Home from 'Coopcon/activities/Home'

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
