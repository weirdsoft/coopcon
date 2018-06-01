import React, { Component } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, mapProps, setDisplayName } from 'recompose'
import { StyleSheet, View, FlatList } from 'react-native'
import { getEditingProductsIds } from 'Coopcon/data/order/selectors'
import Product from './components/Product'
import AddProductButton from './components/AddProductButton'
import OrderProductSelector from './components/OrderProductSelector'
import SaveDialog from './components/SaveDialog'
import SaveButton from './components/SaveButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
})

const mapStateToProps = (state) => ({
  products: getEditingProductsIds(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  mapProps(R.evolve({
    products: R.map((id) => ({ id })),
  })),
  setDisplayName('EditOrder'),
)

const EditOrder = enhancer(({ products }) => (
  <View style={styles.container}>
    <FlatList
      data={products}
      keyExtractor={R.prop('id')}
      renderItem={({ item: { id } }) => (
        <Product id={id} />
      )}
    />
    <AddProductButton />
    <OrderProductSelector />
    <SaveDialog />
  </View>
))

export default class EditOrderWrapper extends Component {
  render() {
    return <EditOrder/>
  }
}

EditOrderWrapper.navigationOptions = {
  title: 'Editar Pedido',
  headerRight: <SaveButton />,
}
