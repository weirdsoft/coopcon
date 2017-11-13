import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'

const Product = ({ name, quantity, unit, price }) => (
  <Card className="text-center">
    <h4 className="card-title">{name}</h4>
    <div>{quantity} {unit}</div>
    <h2>${price}</h2>
  </Card>
)

Product.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default Product
