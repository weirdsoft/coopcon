import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { isLoadingOperations, getOperationIds } from 'Coopcon/data/operation/selectors'
import { StyleSheet, View, FlatList } from 'react-native'
import withLoadingIndicator from 'Coopcon/hocs/withLoadingIndicator'
import Operation from './components/Operation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  loading: isLoadingOperations(state),
  operations: R.map((id) => ({ id }), getOperationIds(state)),
})

const enhancer = compose(
  connect(mapStateToProps),
  withLoadingIndicator(),
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

export default class HomeWrapper extends Component {
  render() {
    return <Home/>
  }
}

HomeWrapper.navigationOptions = {
  title: 'Cooperativa de Consumo',
}
