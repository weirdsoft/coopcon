import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName, setPropTypes } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { TouchableRipple, Text, Divider } from 'react-native-paper'
import { addProductToOrder } from 'Coopcon/data/order/actions'
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

const mapDispatchToProps = (dispatch, { id }) => ({
  addProductToOrder: () => dispatch(addProductToOrder(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('product'),
  setDisplayName('ProductButton'),
  setPropTypes({
    id: PropTypes.string.isRequired,
  }),
)

const ProductButton = enhancer(({ name, addProductToOrder }) => (
  <View>
    <TouchableRipple
      style={styles.container}
      onPress={addProductToOrder}
    >
      <Text style={styles.name}>
        {name}
      </Text>
    </TouchableRipple>
    <Divider/>
  </View>
))

export default ProductButton
