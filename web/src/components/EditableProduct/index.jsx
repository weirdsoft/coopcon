import React from 'react'
import PropTypes from 'prop-types'
import { compose, mapProps, withHandlers, setDisplayName } from 'recompose'
import { coalesce, validations } from 'utils'
import Card from 'components/Card'

const productValidations = {
  name: validations.string,
  quantity: validations.int,
  unit: validations.string,
  minimalFraction: validations.float,
  price: validations.float,
}

const enhancer = compose(
  mapProps(({ name, quantity, unit, minimalFraction, price, ...props }) => ({
    ...props,
    name: coalesce(name, ''),
    quantity: coalesce(quantity, ''),
    unit: coalesce(unit, ''),
    minimalFraction: coalesce(minimalFraction, ''),
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
    onKeyDown: ({ onCancel }) => (event) => {
      if (event.key === 'Escape') {
        onCancel()
      }
    },
  }),
  setDisplayName('EditableProduct'),
)

const EditableProduct = enhancer(({
  name, quantity, unit, minimalFraction, price, onKeyDown, onUpdate, onSubmit, onCancel,
}) => (
  <Card className="text-center h-100">
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          required
          type="text"
          value={name}
          onKeyDown={onKeyDown}
          onChange={(event) => onUpdate('name', event)}
          className="form-control"
          placeholder="Nombre"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          required
          type="number"
          min="1"
          step="1"
          pattern="\d+"
          value={quantity}
          onKeyDown={onKeyDown}
          onChange={(event) => onUpdate('quantity', event)}
          className="form-control"
          placeholder="Cantidad"
        />
      </div>
      <div className="form-group">
        <input
          required
          type="text"
          value={unit}
          onKeyDown={onKeyDown}
          onChange={(event) => onUpdate('unit', event)}
          className="form-control"
          placeholder="Unidad"
        />
      </div>
      <div className="form-group">
        <input
          required
          type="number"
          min="0.1"
          step="0.1"
          value={minimalFraction}
          onKeyDown={onKeyDown}
          onChange={(event) => onUpdate('minimalFraction', event)}
          className="form-control"
          placeholder="Fracción Mínima"
        />
      </div>
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            required
            type="number"
            min="0"
            step="1"
            value={price}
            onKeyDown={onKeyDown}
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
