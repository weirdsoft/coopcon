import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getProduct } from 'data/product/selectors'
import BaseProduct from 'components/Product'

const mapStateToProps = (state, { productId }) => ({
  product: getProduct(state, productId),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('product'),
  setDisplayName('Product'),
)

const Product = enhancer(BaseProduct)

Product.propTypes = {
  productId: PropTypes.string.isRequired,
}

export default Product
