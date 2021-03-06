import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, mapProps, setDisplayName } from 'recompose'
import { goToNewOrder } from 'Coopcon/data/navigation/actions'
import { fetchOperation } from 'Coopcon/data/operation/actions'
import { isLoadingOperations } from 'Coopcon/data/operation/selectors'
import { getCurrentOperationFilteredOrders } from 'Coopcon/data/operation-order/selectors'
import { StyleSheet, View, FlatList } from 'react-native'
import { Divider } from 'react-native-paper'
import FloatingFAB from 'Coopcon/components/FloatingFAB'
import Order from './components/Order'
import Filters from './components/Filters'
import Search from './components/Search'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  orderListFooter: {
    height: 70,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
})

const mapStateToProps = (state) => ({
  loading: isLoadingOperations(state),
  orders: getCurrentOperationFilteredOrders(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchOperation: () => dispatch(fetchOperation()),
  goToNewOrder: () => dispatch(goToNewOrder()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(R.evolve({
    orders: R.map((id) => ({ id })),
  })),
  setDisplayName('Operation'),
)

const Operation = enhancer(({ loading, orders, goToNewOrder, fetchOperation }) => (
  <View style={styles.container}>
    <Search />
    <FlatList
      onRefresh={fetchOperation}
      refreshing={loading}
      data={orders}
      keyExtractor={R.prop('id')}
      renderItem={({ item: { id } }) => (<Order id={id} />)}
      ListFooterComponent={<View style={styles.orderListFooter} />}
      ItemSeparatorComponent={Divider}
    />
    <FloatingFAB
      icon="add"
      action={goToNewOrder}
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
  headerRight: <Filters />,
}
