import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { StyleSheet, View, FlatList } from 'react-native'
import { FAB } from 'react-native-paper'
import { getCreatingProducts } from 'Coopcon/data/order/selectors'
import Product from './components/Product'

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
  products: getCreatingProducts(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  setDisplayName('Order'),
)

const Order = enhancer(({ products }) => (
  <View style={styles.container}>
    <FlatList
      data={products}
      keyExtractor={R.prop('product')}
      renderItem={({ item: { product, quantity } }) => (
        <Product id={product} quantity={quantity} />
      )}
    />
    <View style={styles.buttonContainer}>
      <FAB
        icon="add"
        style={styles.button}
        dark={true}
      />
    </View>
  </View>
))

export default class OrderWrapper extends Component {
  render() {
    return <Order/>
  }
}

OrderWrapper.navigationOptions = {
  title: 'Orden',
}
