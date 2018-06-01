import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, setDisplayName } from 'recompose'
import ProductSelector from 'Coopcon/components/ProductSelector'
import OrderProductButton from './OrderProductButton'
import { hideAddOrderProductDialog } from 'Coopcon/data/order/actions'
import { isAddingProduct, getOrderAvailableProducts } from 'Coopcon/data/order/selectors'

const mapStateToProps = (state) => ({
  visible: isAddingProduct(state),
  productIds: getOrderAvailableProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
  onHide: () => dispatch(hideAddOrderProductDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    renderProduct: () => (id) => (<OrderProductButton id={id} />), // eslint-disable-line
  }),
  setDisplayName('OrderProductSelector'),
)

const OrderProductSelector = enhancer(ProductSelector)

export default OrderProductSelector
