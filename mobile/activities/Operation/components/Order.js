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
import { toggleOrder, togglePaidOrder, deleteOrder } from 'Coopcon/data/order/actions'
import { getOrderWithTotal, isCurrentOrder } from 'Coopcon/data/order/selectors'
import { goToOrder } from 'Coopcon/data/navigation/actions'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  containerExpanded: {
    marginVertical: 5,
    elevation: 4,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  products: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  shortDivider: {
    marginHorizontal: 15,
  },
  totalContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  total: {
    flex: 1,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f3f3f3',
  },
  leftActions: {
    flexDirection: 'row',
  },
  rightActions: {
    flexDirection: 'row',
  },
  action: {
    padding: 10,
  },
})

const mapStateToProps = (state, { id }) => ({
  order: getOrderWithTotal(state, id),
  isCurrentOrder: isCurrentOrder(state, id),
})

const mapDispatchToProps = (dispatch, { id }) => ({
  toggleOrder: () => dispatch(toggleOrder(id)),
  togglePaidOrder: () => dispatch(togglePaidOrder()),
  deleteOrder: () => dispatch(deleteOrder()),
  goToOrder: () => dispatch(goToOrder()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('order'),
  setDisplayName('Order'),
)

const Order = enhancer(({
  user, products, total, isCurrentOrder, paid, toggleOrder, togglePaidOrder, deleteOrder,
  goToOrder,
}) => (
  <Paper
    style={R.when(
      R.always(isCurrentOrder),
      R.append(styles.containerExpanded),
    )([ styles.container ])}
  >
    <TouchableRipple
      onPress={toggleOrder}
      borderless={true}
    >
      <View>
        <View style={styles.header}>
          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {user}
          </Text>
          <SimpleLineIcons name={isCurrentOrder ? 'arrow-up' : 'arrow-down'} size={10}/>
        </View>
        <Collapsible
          collapsed={!isCurrentOrder}
        >
          <Divider />
          <View style={styles.products} >
            {products.map(({ product, quantity }) => (
              <Product key={product} id={product} orderQuantity={quantity}/>
            ))}
          </View>
          <Divider style={styles.shortDivider}/>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>
              TOTAL
            </Text>
            <Text>
              ${total}
            </Text>
          </View>
          <View style={styles.actions}>
            <View style={styles.leftActions}>
              <TouchableRipple
                borderless={true}
                onPress={deleteOrder}
                style={styles.action}
              >
                <MaterialIcons name="delete" size={20} color="gray" />
              </TouchableRipple>
            </View>
            <View style={styles.rightActions}>
              <TouchableRipple
                borderless={true}
                onPress={goToOrder}
                style={styles.action}
              >
                <MaterialIcons name="edit" size={20} color="gray" />
              </TouchableRipple>
              <TouchableRipple
                borderless={true}
                onPress={togglePaidOrder}
                style={styles.action}
              >
                <MaterialIcons name="attach-money" size={20} color={paid ? 'green' : 'gray'} />
              </TouchableRipple>
            </View>
          </View>
        </Collapsible>
      </View>
    </TouchableRipple>
  </Paper>
))

export default Order
