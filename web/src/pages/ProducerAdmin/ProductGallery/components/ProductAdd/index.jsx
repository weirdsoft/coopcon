import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  compose, flattenProp, branch, renderComponent, withHandlers, setDisplayName,
} from 'recompose'
import { getCurrentId } from 'data/producer/selectors'
import { addNewProduct, changeNewProduct } from 'data/product/actions'
import { isAddingProduct, getNewProduct } from 'data/product/selectors'
import { goToProductAdd, goToProductGallery } from 'data/route/actions'
import Link from 'redux-first-router-link'
import Card from 'components/Card'
import EditableProduct from 'components/EditableProduct'
import styles from './styles.scss'

const mapStateToPlaceholderProps = (state) => ({
  producerId: getCurrentId(state),
})

const placeholderEnhancer = compose(
  connect(mapStateToPlaceholderProps),
  setDisplayName('ProductAddPlaceholder'),
)

const ProductAddPlaceholder = placeholderEnhancer(({ producerId }) => (
  <Card className={classNames('text-center', 'h-100', styles.productAdd)}>
    <Link to={goToProductAdd(producerId)}>
      <div>
        <i className="fa fa-plus-circle fa-4x" />
      </div>
      Agregar Producto
    </Link>
  </Card>
))

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  isAdding: isAddingProduct(state),
  product: getNewProduct(state),
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (change) => dispatch(changeNewProduct(change)),
  onSubmit: () => dispatch(addNewProduct()),
  onCancel: (producerId) => dispatch(goToProductGallery(producerId)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ isAdding }) => !isAdding,
    renderComponent(ProductAddPlaceholder),
  ),
  withHandlers({
    onCancel: ({ producerId, onCancel }) => () => onCancel(producerId),
  }),
  flattenProp('product'),
  setDisplayName('ProductAdd'),
)

const ProductAdd = enhancer(EditableProduct)

export default ProductAdd
