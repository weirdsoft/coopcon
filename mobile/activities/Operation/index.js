import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { getOrderIds } from 'Coopcon/data/order/selectors'
import { StyleSheet, View, FlatList } from 'react-native'
import Order from './components/Order'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  orders: R.map((id) => ({ id }), getOrderIds(state)),
})

const enhancer = compose(
  connect(mapStateToProps),
  setDisplayName('Home'),
)

const Operation = enhancer(({ orders }) => (
  <View style={styles.container}>
    <FlatList
      data={orders}
      keyExtractor={R.prop('id')}
      renderItem={({ item: { id } }) => (<Order id={id} />)}
    />
  </View>
))

export default class OperationWrapper extends Component {
  render() {
    return <Operation/>
  }
}

OperationWrapper.navigationOptions = {
  title: 'Pedidos',
}
