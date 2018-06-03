import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { compose, branch, renderNothing, lifecycle, setPropTypes, setDisplayName } from 'recompose'
import { BackHandler } from 'react-native'
import { View, StyleSheet, FlatList } from 'react-native'
import {
  Dialog, DialogTitle, DialogScrollArea, TouchableRipple, Text, Divider,
} from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: 'white',
  },
  productName: {
    flex: 1,
  },
})

const enhancer = compose(
  branch(
    R.compose(R.not, R.prop('visible')),
    renderNothing,
  ),
  lifecycle({
    componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", this.props.onHide)
    },
    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.props.onHide)
    },
  }),
  setPropTypes({
    visible: PropTypes.bool.isRequired,
    productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    renderProduct: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  }),
  setDisplayName('ProductSelector'),
)

const ProductSelector = enhancer(({ visible, productIds, renderProduct, onHide }) => (
  <Dialog
    visible={visible}
    onDismiss={onHide}
  >
    <DialogTitle>
      Seleccione un producto
    </DialogTitle>
    <DialogScrollArea
      style={styles.container}
    >
      <FlatList
        data={productIds}
        keyExtractor={R.identity}
        renderItem={R.compose(renderProduct, R.prop('item'))}
      />
    </DialogScrollArea>
  </Dialog>
))

export default ProductSelector

const buttonEnhancer = compose(
  setPropTypes({
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  }),
  setDisplayName('ProductButton'),
)

export const ProductButton = buttonEnhancer(({ name, onSelect }) => (
  <View>
    <TouchableRipple
      style={styles.buttonContainer}
      onPress={onSelect}
    >
      <Text style={styles.productName} numberOfLines={1}>
        {name}
      </Text>
    </TouchableRipple>
    <Divider/>
  </View>
))
