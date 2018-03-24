import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { View, FlatList } from 'react-native'
import { getCreatingProducts } from 'Coopcon/data/order/selectors'
import Product from './components/Product'

const mapStateToProps = (state) => ({
  products: getCreatingProducts(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  setDisplayName('Order'),
)

const Order = enhancer(({ products }) => (
  <View>
    <FlatList
      data={products}
      keyExtractor={R.prop('product')}
      renderItem={({ item: { product, quantity } }) => (
        <Product id={product} quantity={quantity} />
      )}
    />
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
