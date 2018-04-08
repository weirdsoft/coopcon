import { connect } from 'react-redux'
import { compose, flattenProp, withHandlers, setDisplayName } from 'recompose'
import { getCurrentId } from 'data/producer/selectors'
import { editProduct, changeEditingProduct } from 'data/product/actions'
import { getEditingProduct } from 'data/product/selectors'
import { goToProductGallery } from 'data/route/actions'
import EditableProduct from 'components/EditableProduct'

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  product: getEditingProduct(state),
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (change) => dispatch(changeEditingProduct(change)),
  onSubmit: () => dispatch(editProduct()),
  onCancel: (producerId) => dispatch(goToProductGallery(producerId)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onCancel: ({ producerId, onCancel }) => () => onCancel(producerId),
  }),
  flattenProp('product'),
  setDisplayName('ProductEdit'),
)

const ProductEdit = enhancer(EditableProduct)

export default ProductEdit
