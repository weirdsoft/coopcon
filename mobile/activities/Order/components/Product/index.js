import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName, setPropTypes } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { Text, Divider } from 'react-native-paper'
import { getProduct } from 'Coopcon/data/product/selectors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: 'white',
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
  <View>
    <View style={styles.container}>
      <Text style={styles.name}>
        {name}
      </Text>
      <Text>
        {quantity} {unit}
      </Text>
    </View>
    <Divider/>
  </View>
))

export default Product
