import React from 'react'
import PropTypes from 'prop-types'
import { compose, mapProps, withHandlers, setDisplayName } from 'recompose'
import { coalesce, validations } from 'utils'
import Card from 'components/Card'

const productValidations = {
  name: validations.string,
  quantity: validations.number,
  unit: validations.string,
  price: validations.number,
}

const enhancer = compose(
  mapProps(({ name, quantity, unit, price, ...props }) => ({
    ...props,
    name: coalesce(name, ''),
    quantity: coalesce(quantity, ''),
    unit: coalesce(unit, ''),
    price: coalesce(price, ''),
  })),
  withHandlers({
    onUpdate: ({ onUpdate }) => (field, { target: { value } }) => {
      onUpdate({
        [field]: productValidations[field](value),
      })
    },
    onSubmit: ({ onSubmit }) => (event) => {
      event.preventDefault()
      onSubmit()
    },
  }),
  setDisplayName('EditableProduct'),
)

const EditableProduct = enhancer(({
  name, quantity, unit, price, onUpdate, onSubmit, onCancel,
}) => (
  <Card className="text-center">
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(event) => onUpdate('name', event)}
          className="form-control"
          placeholder="Nombre"
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          value={quantity}
          onChange={(event) => onUpdate('quantity', event)}
          className="form-control"
          placeholder="Cantidad"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          value={unit}
          onChange={(event) => onUpdate('unit', event)}
          className="form-control"
          placeholder="Unidad"
        />
      </div>
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon">$</span>
          <input
            type="text"
            value={price}
            onChange={(event) => onUpdate('price', event)}
            className="form-control"
            placeholder="Precio"
          />
        </div>
      </div>
      <div className="btn-group">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  </Card>
))

EditableProduct.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  unit: PropTypes.string,
  price: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default EditableProduct
