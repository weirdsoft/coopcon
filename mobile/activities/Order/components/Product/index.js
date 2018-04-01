import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName, setPropTypes } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { Text, Paper, TouchableRipple, Divider } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { getProduct } from 'Coopcon/data/product/selectors'
import { addToProductQuantity, subtractToProductQuantity } from 'Coopcon/data/order/actions'
import { getOrderProductQuantity } from 'Coopcon/data/order/selectors'

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
  unit: {
    fontStyle: 'italic',
    color: 'gray',
  },
  quantity: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    width: 30,
    height: 25,
    marginHorizontal: 10,
  },
  quantityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
})

const mapStateToProps = (state, { id }) => ({
  product: getProduct(state, id),
  quantity: getOrderProductQuantity(state, id),
})

const mapDispatchToProps = (dispatch, { id }) => ({
  addToProductQuantity: () => dispatch(addToProductQuantity(id)),
  subtractToProductQuantity: () => dispatch(subtractToProductQuantity(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('product'),
  setDisplayName('Product'),
  setPropTypes({
    id: PropTypes.string.isRequired,
  }),
)

const Product = enhancer(({
  quantity, name, unit, addToProductQuantity, subtractToProductQuantity,
}) => (
  <View>
    <View style={styles.container}>
      <Text style={styles.name}>
        {name}
        <Text style={styles.unit}>
          &nbsp;x {unit}
        </Text>
      </Text>
      <TouchableRipple
        style={styles.quantityButton}
        borderless={true}
        onPress={subtractToProductQuantity}
      >
        <MaterialIcons name="remove" size={25} />
      </TouchableRipple>
      <Paper style={styles.quantity}>
        <Text>
          {quantity}
        </Text>
      </Paper>
      <TouchableRipple
        style={styles.quantityButton}
        borderless={true}
        onPress={addToProductQuantity}
      >
        <MaterialIcons name="add" size={25} />
      </TouchableRipple>
    </View>
    <Divider/>
  </View>
))

export default Product
