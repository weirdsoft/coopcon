import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { getOperations } from 'Coopcon/data/operation/selectors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = (state) => ({
  operations: getOperations(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  setDisplayName('Operations'),
)

const App = enhancer(({ operations }) => (
  <View style={styles.container}>
    {operations.map(({ _id, name }) => (
      <Text key={_id}>{name}</Text>
    ))}
  </View>
))

export default App
