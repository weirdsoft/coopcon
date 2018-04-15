import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, setDisplayName } from 'recompose'
import { makeIsEditingProduct } from 'data/product/selectors'
import Product from '../Product'
import ProductEdit from '../ProductEdit'

const mapStateToProps = (_, { id }) => {
  const isEditingProduct = makeIsEditingProduct(id)

  return (state) => ({
    isEditing: isEditingProduct(state),
  })
}

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    R.prop('isEditing'),
    renderComponent(ProductEdit),
  ),
  setDisplayName('ProductWrapper'),
)

export default enhancer(Product)
