import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { compose, mapProps, withHandlers, setPropTypes, setDisplayName } from 'recompose'
import { validations } from 'utils'
import DatePicker from 'react-datepicker'

const operationValidations = {
  publishDate: validations.date,
  closeDate: validations.date,
  deliveryDate: validations.date,
}
const enhancer = compose(
  setPropTypes({
    publishDate: PropTypes.number,
    closeDate: PropTypes.number,
    deliveryDate: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }),
  mapProps(({ publishDate, closeDate, deliveryDate, ...props }) => ({
    ...props,
    publishDate: publishDate == null ? null : moment(publishDate),
    closeDate: closeDate == null ? null : moment(closeDate),
    deliveryDate: deliveryDate == null ? null : moment(deliveryDate),
  })),
  withHandlers({
    onUpdate: ({ onUpdate }) => (field, value) => {
      onUpdate({
        [field]: operationValidations[field](value),
      })
    },
    onCancel: ({ onCancel, producerId }) => () => onCancel(producerId),
  }),
  withHandlers({
    onKeyDown: ({ onSubmit, onCancel }) => (event) => {
      if (event.key === 'Enter') {
        onSubmit()
      } else if (event.key === 'Escape') {
        onCancel()
      }
    },
  }),
  setDisplayName('EditableOperation'),
)

const EditableOperation = enhancer(({
  publishDate, closeDate, deliveryDate, onKeyDown, onUpdate, onSubmit, onCancel,
}) => (
  <tr>
    <td>
      <DatePicker
        className="form-control"
        selected={publishDate}
        dateFormat="DD/MM HH:mm"
        minDate={moment().startOf('day')}
        showTimeSelect
        timeFormat="HH:mm"
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport',
          },
        }}
        onKeyDown={onKeyDown}
        onChange={(date) => onUpdate('publishDate', date)}
      />
    </td>
    <td>
      <DatePicker
        className="form-control"
        selected={closeDate}
        minDate={publishDate}
        dateFormat="DD/MM HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport',
          },
        }}
        onKeyDown={onKeyDown}
        onChange={(date) => onUpdate('closeDate', date)}
      />
    </td>
    <td>
      <DatePicker
        className="form-control"
        selected={deliveryDate}
        minDate={closeDate}
        dateFormat="DD/MM HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport',
          },
        }}
        onKeyDown={onKeyDown}
        onChange={(date) => onUpdate('deliveryDate', date)}
      />
    </td>
    <td>
      <span className="btn-group">
        <button
          type="button"
          title="Crear Operativo"
          className="btn btn-small btn-primary"
          onClick={onSubmit}
        >
          <i className="fa fa-check" />
        </button>
        <button
          type="button"
          title="Cancelar"
          className="btn btn-small btn-secondary"
          onClick={onCancel}
        >
          <i className="fa fa-times" />
        </button>
      </span>
    </td>
  </tr>
))

export default EditableOperation
