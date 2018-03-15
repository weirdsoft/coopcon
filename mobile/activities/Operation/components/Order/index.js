import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { View, StyleSheet, Text } from 'react-native'
import { getOrder } from 'Coopcon/data/order/selectors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000',
  },
  name: {
    flex: 1,
  },
})

const mapStateToProps = (state, { id }) => ({
  order: getOrder(state, id),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('order'),
  setDisplayName('Order'),
)

const Order = enhancer(({ user }) => (
  <View
    style={styles.container}
  >
    <Text style={styles.name}>{user}</Text>
  </View>
))

export default Order
