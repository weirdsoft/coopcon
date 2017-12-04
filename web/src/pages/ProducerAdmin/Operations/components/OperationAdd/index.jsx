import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import {
  compose, branch, renderNothing, flattenProp, mapProps, withHandlers, setDisplayName,
} from 'recompose'
import { coalesce, validations } from 'utils'
import { changeNewOperation } from 'data/operation/actions'
import { isAddingOperation, getNewOperation } from 'data/operation/selectors'
import DatePicker from 'react-datepicker'

const operationValidations = {
  name: validations.string,
  publishDate: validations.date,
  closeDate: validations.date,
  deliveryDate: validations.date,
}

const mapStateToProps = (state) => ({
  isAdding: isAddingOperation(state),
  operation: getNewOperation(state),
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (changes) => dispatch(changeNewOperation(changes)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ isAdding }) => !isAdding,
    renderNothing,
  ),
  flattenProp('operation'),
  mapProps(({ name, publishDate, closeDate, deliveryDate, ...props }) => ({
    ...props,
    name: coalesce(name, ''),
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
  }),
  setDisplayName('OperationAdd'),
)

const OperationAdd = enhancer(({ name, publishDate, closeDate, deliveryDate, onUpdate }) => (
  <tr>
    <td>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(event) => onUpdate('name', event.target.value)}
      />
    </td>
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
        onChange={(date) => onUpdate('deliveryDate', date)}
      />
    </td>
  </tr>
))

export default OperationAdd
