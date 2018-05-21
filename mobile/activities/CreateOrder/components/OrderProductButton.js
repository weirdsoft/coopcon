import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName, setPropTypes } from 'recompose'
import { ProductButton } from 'Coopcon/components/ProductSelector'
import { addProductToOrder } from 'Coopcon/data/order/actions'
import { getProduct } from 'Coopcon/data/product/selectors'

const mapStateToProps = (state, { id }) => ({
  product: getProduct(state, id),
})

const mapDispatchToProps = (dispatch, { id }) => ({
  onSelect: () => dispatch(addProductToOrder(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('product'),
  setPropTypes({
    id: PropTypes.string.isRequired,
  }),
  setDisplayName('OrderProductButton'),
)

const OrderProductButton = enhancer(ProductButton)

export default OrderProductButton
