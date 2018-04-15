import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers, flattenProp, setDisplayName } from 'recompose'
import { goToProductEdit } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import { getProduct } from 'data/product/selectors'
import BaseProduct from 'components/Product'

const mapStateToProps = (state, { id }) => ({
  producerId: getCurrentId(state),
  product: getProduct(state, id),
})

const mapDispatchToProps = (dispatch) => ({
  goToProductEdit: (producerId, productId) => dispatch(goToProductEdit(producerId, productId)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onEdit: ({ producerId, id, goToProductEdit }) => () => goToProductEdit(producerId, id),
  }),
  flattenProp('product'),
  setDisplayName('Product'),
)

const Product = enhancer(BaseProduct)

Product.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Product
