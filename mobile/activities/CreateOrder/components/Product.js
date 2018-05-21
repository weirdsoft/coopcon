import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName, setPropTypes } from 'recompose'
import EditableOrderProduct from 'Coopcon/components/EditableOrderProduct'
import { getProduct } from 'Coopcon/data/product/selectors'
import { addToProductQuantity, subtractToProductQuantity } from 'Coopcon/data/order/actions'
import { getOrderProductQuantity } from 'Coopcon/data/order/selectors'

const mapStateToProps = (state, { id }) => ({
  product: getProduct(state, id),
  quantity: getOrderProductQuantity(state, id),
})

const mapDispatchToProps = (dispatch, { id }) => ({
  add: () => dispatch(addToProductQuantity(id)),
  subtract: () => dispatch(subtractToProductQuantity(id)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('product'),
  setDisplayName('Product'),
  setPropTypes({
    id: PropTypes.string.isRequired,
  }),
)

const Product = enhancer(EditableOrderProduct)

export default Product
