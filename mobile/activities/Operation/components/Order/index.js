import React from 'react'
import { connect } from 'react-redux'
import { compose, withState, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'
import Product from 'Coopcon/activities/Operation/components/Product'
import { getOrder } from 'Coopcon/data/order/selectors'

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
})

const mapStateToProps = (state, { id }) => ({
  order: getOrder(state, id),
})

const enhancer = compose(
  connect(mapStateToProps),
  withState('collapsed', 'setCollapsed', true),
  flattenProp('order'),
  setDisplayName('Order'),
)

const Order = enhancer(({ user, products, collapsed, setCollapsed }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => setCollapsed(!collapsed)}
  >
    <View style={styles.header}>
      <Text
        style={styles.name}
      >
        {user}
      </Text>
      <SimpleLineIcons name={collapsed ? 'arrow-down' : 'arrow-up'} size={10}/>
    </View>
    <Collapsible
      collapsed={collapsed}
      duration={100}
    >
      <View style={styles.separator}/>
      {products.map(({ product, quantity }) => (
        <Product key={product} id={product} quantity={quantity}/>
      ))}
    </Collapsible>
  </TouchableOpacity>
))

export default Order
