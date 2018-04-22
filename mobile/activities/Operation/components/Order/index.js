import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'
import Collapsible from 'react-native-collapsible'
import { Paper, TouchableRipple, Divider } from 'react-native-paper'
import Product from 'Coopcon/activities/Operation/components/Product'
import { toggleOrder, togglePaidOrder } from 'Coopcon/data/order/actions'
import { getOrderWithTotal, isCurrentOrder } from 'Coopcon/data/order/selectors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
  },
  containerExpanded: {
    marginVertical: 5,
    elevation: 4,
  },
  header: {
    paddingHorizontal: 15,
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
  content: {
    paddingHorizontal: 15,
  },
  totalContainer: {
    flexDirection: 'row',
  },
  total: {
    flex: 1,
    fontWeight: 'bold',
  },
  actions: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
})

const mapStateToProps = (state, { id }) => ({
  order: getOrderWithTotal(state, id),
  isCurrentOrder: isCurrentOrder(state, id),
})

const mapDispatchToprops = (dispatch, { id }) => ({
  toggleOrder: () => dispatch(toggleOrder(id)),
  togglePaidOrder: () => dispatch(togglePaidOrder(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToprops),
  flattenProp('order'),
  setDisplayName('Order'),
)

const Order = enhancer(({
  user, products, total, isCurrentOrder, paid, toggleOrder, togglePaidOrder,
}) => (
  <TouchableRipple
    onPress={toggleOrder}
  >
    <Paper
      style={R.when(
        R.always(isCurrentOrder),
        R.append(styles.containerExpanded),
      )([ styles.container ])}
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
        <View style={styles.content}>
          <Divider style={styles.divider}/>
          {products.map(({ product, quantity }) => (
            <Product key={product} id={product} orderQuantity={quantity}/>
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
        </View>
        <Divider style={styles.divider}/>
        <View style={styles.actions}>
          <TouchableRipple
            borderless={true}
            onPress={togglePaidOrder}
          >
            <MaterialIcons name="attach-money" size={20} color={paid ? 'green' : 'gray'}/>
          </TouchableRipple>
        </View>
      </Collapsible>
    </Paper>
  </TouchableRipple>
))

export default Order
