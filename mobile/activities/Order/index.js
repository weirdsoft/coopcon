import React, { Component } from 'react'
import { compose, setDisplayName } from 'recompose'
import { View, Text } from 'react-native'

const enhancer = compose(
  setDisplayName('Order'),
)

const Order = enhancer(() => (
  <View>
    <Text>
      Hello!
    </Text>
  </View>
))

export default class OrderWrapper extends Component {
  render() {
    return <Order/>
  }
}

OrderWrapper.navigationOptions = {
  title: 'Orden',
}
