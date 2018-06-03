import React from 'react'
import PropTypes from 'prop-types'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import { View, StyleSheet } from 'react-native'
import { Text, Paper, TouchableRipple, Divider } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

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
    flexShrink: 1,
  },
  unit: {
    margin: 0,
    flexGrow: 1,
    fontStyle: 'italic',
    color: 'gray',
  },
  quantity: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    width: 45,
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

const enhancer = compose(
  setDisplayName('EditableOrderProduct'),
  setPropTypes({
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    add: PropTypes.func.isRequired,
    subtract: PropTypes.func.isRequired,
  }),
)

const Product = enhancer(({ quantity, name, unit, add, subtract }) => (
  <View>
    <View style={styles.container}>
      <Text style={styles.name} numberOfLines={1}>
        {name}&nbsp;
      </Text>
      <Text style={styles.unit}>
        x {unit}
      </Text>
      <TouchableRipple
        style={styles.quantityButton}
        borderless={true}
        onPress={subtract}
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
        onPress={add}
      >
        <MaterialIcons name="add" size={25} />
      </TouchableRipple>
    </View>
    <Divider/>
  </View>
))

export default Product
