import React from 'react'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000',
  },
  name: {
    flex: 1,
  },
})

const enhancer = compose(
  flattenProp('item'),
  setDisplayName('Operation'),
)

const Operation = enhancer(({ name }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <SimpleLineIcons name="arrow-right" size={20}/>
  </View>
))

export default Operation
