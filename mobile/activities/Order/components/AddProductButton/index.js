import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, setDisplayName } from 'recompose'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { showAddOrderProductDialog } from 'Coopcon/data/order/actions'
import { hasOrderAvailableProducts } from 'Coopcon/data/order/selectors'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
})

const mapStateToProps = (state) => ({
  hasOrderAvailableProducts: hasOrderAvailableProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
  showAddOrderProductDialog: () => dispatch(showAddOrderProductDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    R.compose(R.not, R.prop('hasOrderAvailableProducts')),
    renderNothing,
  ),
  setDisplayName('Order'),
)

const AddProductButton = enhancer(({ showAddOrderProductDialog }) => (
  <View style={styles.buttonContainer}>
    <FAB
      onPress={showAddOrderProductDialog}
      icon="add"
    />
  </View>
))

export default AddProductButton
