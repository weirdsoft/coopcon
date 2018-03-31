import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, setDisplayName } from 'recompose'
import { StyleSheet, FlatList } from 'react-native'
import { Dialog, DialogTitle, DialogScrollArea } from 'react-native-paper'
import { hideAddOrderProductDialog } from 'Coopcon/data/order/actions'
import { isAddingProduct, getOrderAvailableProducts } from 'Coopcon/data/order/selectors'
import ProductButton from './ProductButton'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
})

const mapStateToProps = (state) => ({
  isAddingProduct: isAddingProduct(state),
  products: getOrderAvailableProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
  hideAddOrderProductDialog: () => dispatch(hideAddOrderProductDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ isAddingProduct }) => !isAddingProduct,
    renderNothing,
  ),
  setDisplayName('ProductSelector'),
)

const ProductSelector = enhancer(({ isAddingProduct, products, hideAddOrderProductDialog }) => (
  <Dialog
    visible={isAddingProduct}
    onDismiss={hideAddOrderProductDialog}
  >
    <DialogTitle>
      Seleccione un producto
    </DialogTitle>
    <DialogScrollArea
      style={styles.container}
    >
      <FlatList
        data={products}
        keyExtractor={R.prop('id')}
        renderItem={({ item: { id } }) => (
          <ProductButton id={id} />
        )}
      />
    </DialogScrollArea>
  </Dialog>
))

export default ProductSelector
