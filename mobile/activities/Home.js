import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName, setStatic } from 'recompose'
import { prop } from 'ramda'
import { getOperations } from 'Coopcon/data/operation/selectors'
import { StyleSheet, Text, View, FlatList } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  operations: getOperations(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  setStatic('navigationOptions', {
    title: 'Cooperativa de Consumo',
  }),
  setDisplayName('Home'),
)

const Home = enhancer(({ operations }) => (
  <View style={styles.container}>
    <FlatList
      data={operations}
      keyExtractor={prop('_id')}
      renderItem={({ item: { name } }) => (
        <Text>{name}</Text>
      )}
    />
  </View>
))

export default Home
