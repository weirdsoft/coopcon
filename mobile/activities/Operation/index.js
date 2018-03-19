import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { goToOrder } from 'Coopcon/data/navigation/actions'
import { getOrderIds } from 'Coopcon/data/order/selectors'
import { StyleSheet, View, FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FloatingAction } from 'react-native-floating-action'
import Order from './components/Order'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  orders: R.map((id) => ({ id }), getOrderIds(state)),
})

const mapDispatchToProps = (dispatch) => ({
  goToOrder: () => dispatch(goToOrder()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  setDisplayName('Home'),
)

const Operation = enhancer(({ orders, goToOrder }) => (
  <View style={styles.container}>
    <FlatList
      data={orders}
      keyExtractor={R.prop('id')}
      renderItem={({ item: { id } }) => (<Order id={id} />)}
    />
    <FloatingAction
      actions={[ {
        position: 1,
        name: 'add',
        icon: (<MaterialIcons name="add" size={25} color="white"/>),
      } ]}
      overrideWithAction={true}
      onPressItem={goToOrder}
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
