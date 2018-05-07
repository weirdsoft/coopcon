import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getProduct } from 'data/product/selectors'
import { toggleOperationProductState } from 'data/operation/actions'
import { makeIsProductInOperation } from 'data/operation/selectors'
import styles from './styles.scss'

const makeMapStateToProps = () => {
  const isProductInOperation = makeIsProductInOperation()

  return (state, { productId }) => ({
    product: getProduct(state, productId),
    isSelected: isProductInOperation(state, productId),
  })
}

const mapDispatchToProps = (dispatch, { productId }) => ({
  toggleProduct: () => dispatch(toggleOperationProductState(productId)),
})

const enhancer = compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  flattenProp('product'),
  setDisplayName('OperationProduct'),
)

const OperationProduct = enhancer(({ name, price, unit, isSelected, toggleProduct }) => (
  <li
    className={classNames('list-group-item', styles.operationProduct)}
    onClick={toggleProduct}
  >
    <div className={styles.info}>
      {name}
      <span className='text-secondary'>
        &nbsp;-&nbsp;${price} x {unit}
      </span>
    </div>
    <i className={classNames('fa', { 'fa-check': isSelected })} />
  </li>
))

OperationProduct.propTypes = {
  productId: PropTypes.string.isRequired,
}

export default OperationProduct
