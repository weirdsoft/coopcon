import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getOperation } from 'data/operation/selectors'

const mapStateToProps = (state, { operationId }) => ({
  operation: getOperation(state, operationId),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('operation'),
  setDisplayName('Operation'),
)

const Operation = enhancer(({ name, publishDate, closeDate, deliveryDate }) => (
  <tr>
    <td>
      {name}
    </td>
    <td>
      {moment(publishDate).calendar()}
    </td>
    <td>
      {moment(closeDate).calendar()}
    </td>
    <td>
      {moment(deliveryDate).calendar()}
    </td>
  </tr>
))

Operation.propTypes = {
  operationId: PropTypes.string.isRequired,
}

export default Operation