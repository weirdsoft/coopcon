import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { fetchOperations } from 'Coopcon/data/operation/actions'
import { isLoadingOperations, getOperationIds } from 'Coopcon/data/operation/selectors'
import { StyleSheet, View, FlatList } from 'react-native'
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

const mapDispatchToProps = (dispatch) => ({
  fetchOperations: () => dispatch(fetchOperations()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  setDisplayName('Home'),
)

const Home = enhancer(({ loading, operations, fetchOperations }) => (
  <View style={styles.container}>
    <FlatList
      onRefresh={fetchOperations}
      refreshing={loading}
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
