import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, flattenProp, mapProps, setDisplayName } from 'recompose'
import { goToOrder } from 'Coopcon/data/navigation/actions'
import { getCurrentOperation } from 'Coopcon/data/operation/selectors'
import { StyleSheet, View, FlatList } from 'react-native'
import { FAB } from 'react-native-paper'
import Order from './components/Order'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
  },
})

const mapStateToProps = (state) => ({
  operation: getCurrentOperation(state),
})

const mapDispatchToProps = (dispatch) => ({
  goToOrder: () => dispatch(goToOrder()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('operation'),
  mapProps(R.evolve({
    orders: R.map((id) => ({ id })),
  })),
  setDisplayName('Home'),
)

const Operation = enhancer(({ orders, goToOrder }) => (
  <View style={styles.container}>
    <FlatList
      data={orders}
      keyExtractor={R.prop('id')}
      renderItem={({ item: { id } }) => (<Order id={id} />)}
    />
    <View style={styles.buttonContainer}>
      <FAB
        icon="add"
        onPress={goToOrder}
        style={styles.button}
        dark={true}
      />
    </View>
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
