import React from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'

const Product = ({ name, unit, minimalFraction, price, onEdit }) => (
  <Card
    className="text-center h-100"
    rightAction={{ text: 'Edit', icon: 'pencil', callback: onEdit }}
  >
    <h4 className="card-title">{name}</h4>
    <div>
      {unit}
      &nbsp;
      <cite>
        (mínimo {minimalFraction})
      </cite>
    </div>

    <h2>${price}</h2>
  </Card>
)

Product.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  minimalFraction: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
}

export default Product
