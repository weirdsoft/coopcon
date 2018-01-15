import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getProduct } from 'data/product/selectors'
import { makeIsProductInOperation } from 'data/operation/selectors'
import styles from './styles.scss'

const makeMapStateToProps = () => {
  const isProductInOperation = makeIsProductInOperation()

  return (state, { productId }) => ({
    product: getProduct(state, productId),
    isSelected: isProductInOperation(state, productId),
  })
}

const enhancer = compose(
  connect(makeMapStateToProps),
  flattenProp('product'),
  setDisplayName('OperationProduct'),
)

const OperationProduct = enhancer(({ name, price, quantity, unit, isSelected }) => (
  <li className={classNames('list-group-item', styles.operationProduct, {
    'bg-primary': isSelected, 'text-light': isSelected, [styles.selected]: isSelected,
  })}>
    {name}
    <span className='text-secondary'>
      &nbsp;-&nbsp;${price} x {quantity} {unit}
    </span>
  </li>
))

OperationProduct.propTypes = {
  productId: PropTypes.string.isRequired,
}

export default OperationProduct
