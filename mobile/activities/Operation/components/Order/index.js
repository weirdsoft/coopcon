import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'
import { Card, CardContent, Divider } from 'react-native-paper'
import Product from 'Coopcon/activities/Operation/components/Product'
import { toggleOrder } from 'Coopcon/data/order/actions'
import { getOrderWithTotal, isCurrentOrder } from 'Coopcon/data/order/selectors'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
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
  <Card
    onPress={toggleOrder}
  >
    <CardContent>
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
        <Divider style={styles.divider}/>
        {products.map(({ product, quantity }) => (
          <Product key={product} id={product} quantity={quantity}/>
        ))}
        <Divider style={styles.divider}/>
        <View style={styles.totalContainer}>
          <Text style={styles.total}>
            TOTAL
          </Text>
          <Text>
            ${total}
          </Text>
        </View>
      </Collapsible>
    </CardContent>
  </Card>
))

export default Order
