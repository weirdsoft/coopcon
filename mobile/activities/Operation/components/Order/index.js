import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'
import Product from 'Coopcon/activities/Operation/components/Product'
import { toggleOrder } from 'Coopcon/data/order/actions'
import { getOrderWithTotal, isCurrentOrder } from 'Coopcon/data/order/selectors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000',
  },
  totalContainer: {
    flexDirection: 'row',
  },
  total: {
    flex: 1,
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state, { id }) => ({
  order: getOrderWithTotal(state, id),
  isCurrentOrder: isCurrentOrder(state, id),
})

const mapDispatchToprops = (dispatch, { id }) => ({
  toggleOrder: () => dispatch(toggleOrder(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToprops),
  flattenProp('order'),
  setDisplayName('Order'),
)

const Order = enhancer(({ user, products, total, isCurrentOrder, toggleOrder }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={toggleOrder}
  >
    <View style={styles.header}>
      <Text
        style={styles.name}
      >
        {user}
      </Text>
      <SimpleLineIcons name={isCurrentOrder ? 'arrow-up' : 'arrow-down'} size={10}/>
    </View>
    <Collapsible
      collapsed={!isCurrentOrder}
    >
      <View style={styles.separator}/>
      {products.map(({ product, quantity }) => (
        <Product key={product} id={product} quantity={quantity}/>
      ))}
      <View style={styles.separator}/>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>
          TOTAL
        </Text>
        <Text>
          ${total}
        </Text>
      </View>
    </Collapsible>
  </TouchableOpacity>
))

export default Order
