import React, { Component } from 'react'
import { View, Text } from 'react-native'

const Operation = () => (
  <View>
    <Text>
      Hello!
    </Text>
  </View>
)

export default class OperationWrapper extends Component {
  render() {
    return <Operation/>
  }
}
