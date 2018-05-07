import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName, setPropTypes } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { getProduct } from 'Coopcon/data/product/selectors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
})

const mapStateToProps = (state, { id }) => ({
  product: getProduct(state, id),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('product'),
  setDisplayName('Product'),
  setPropTypes({
    id: PropTypes.string.isRequired,
    orderQuantity: PropTypes.number.isRequired,
  }),
)

const Product = enhancer(({ orderQuantity, name, unit, price }) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      {name}
    </Text>
    <Text>
      &nbsp;({unit} x {orderQuantity})
    </Text>
    <Text style={styles.price}>
      ${price * orderQuantity}
    </Text>
  </View>
))

export default Product
