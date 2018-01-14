import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getProduct } from 'data/product/selectors'

const mapStateToProps = (state, { productId }) => ({
  product: getProduct(state, productId),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('product'),
  setDisplayName('OperationProduct'),
)

const OperationProduct = enhancer(({ name, price, quantity, unit }) => (
  <li className="list-group-item">
    {name}
    <span className="text-secondary">
      &nbsp;-&nbsp;${price} x {quantity} {unit}
    </span>
  </li>
))

OperationProduct.propTypes = {
  productId: PropTypes.string.isRequired,
}

export default OperationProduct
