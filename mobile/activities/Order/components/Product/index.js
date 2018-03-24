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
    flex: 1,
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
    quantity: PropTypes.number.isRequired,
  }),
)

const Product = enhancer(({ quantity, name, unit }) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      {name}
    </Text>
    <Text>
      {quantity}
    </Text>
    <Text>
      {unit}
    </Text>
  </View>
))

export default Product
