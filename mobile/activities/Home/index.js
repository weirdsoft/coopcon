import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName, setStatic } from 'recompose'
import { getOperationIds } from 'Coopcon/data/operation/selectors'
import { StyleSheet, View, FlatList } from 'react-native'
import Operation from './components/Operation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  operations: R.map((id) => ({ id }), getOperationIds(state)),
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
      keyExtractor={R.prop('id')}
      renderItem={({ item: { id } }) => (<Operation id={id} />)}
    />
  </View>
))

export default Home
