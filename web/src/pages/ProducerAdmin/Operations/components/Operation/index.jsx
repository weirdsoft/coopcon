import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, flattenProp, mapProps, setDisplayName } from 'recompose'
import { goToOperationEdit, goToOperationProducts, goToOperationTotals } from 'data/route/actions'
import { getCurrentOperationId, isShowingOperationSidepanel } from 'data/operation/selectors'
import { getCurrentId } from 'data/producer/selectors'
import { isEditingOperation, getOperation } from 'data/operation/selectors'
import { NavLink } from 'redux-first-router-link'
import OperationEdit from '../OperationEdit'
import styles from './styles.scss'

const mapStateToProps = (state, { operationId }) => ({
  producerId: getCurrentId(state),
  operation: getOperation(state, operationId),
  isCompact: isShowingOperationSidepanel(state),
  currentOperationId: getCurrentOperationId(state),
  isEditing: isEditingOperation(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    R.both(
      R.prop('isEditing'),
      R.compose(
        R.apply(R.equals),
        R.values,
        R.pick([ 'currentOperationId', 'operationId' ]),
      ),
    ),
    renderComponent(OperationEdit),
  ),
  flattenProp('operation'),
  mapProps(({ currentOperationId, _id, ...props }) => ({
    ...props,
    isSelected: currentOperationId === _id,
  })),
  setDisplayName('Operation'),
)

const Operation = enhancer(({
  operationId, publishDate, closeDate, deliveryDate, producerId, isCompact, isSelected,
}) => (
  <tr className={classNames(styles.operation, { 'table-primary': isSelected })}>
    <td>
      {moment(publishDate).calendar(null, { sameElse: 'dddd DD [de] MMMM [a las] HH:mm' })}
    </td>
    { isCompact ? null :
      <td>
        {moment(closeDate).calendar(null, { sameElse: 'dddd DD [de] MMMM [a las] HH:mm' })}
      </td>
    }
    { isCompact ? null :
      <td>
        {moment(deliveryDate).calendar(null, { sameElse: 'dddd DD [de] MMMM [a las] HH:mm' })}
      </td>
    }
    <td>
      <NavLink
        className={classNames('p-1', styles.sectionLink)}
        to={goToOperationEdit(producerId, operationId)}
        activeClassName={styles.active}
      >
        <i className="fa fa-edit" title="Modificar Operación"></i>
      </NavLink>
      <NavLink
        className={classNames('p-1', styles.sectionLink)}
        to={goToOperationProducts(producerId, operationId)}
        activeClassName={styles.active}
      >
        <i className="fa fa-cog" title="Modificar Productos"></i>
      </NavLink>
      <NavLink
        className={classNames('p-1', styles.sectionLink)}
        to={goToOperationTotals(producerId, operationId)}
        activeClassName={styles.active}
      >
        <i className="fa fa-shopping-cart" title="Ver Totales"></i>
      </NavLink>
    </td>
  </tr>
))

Operation.propTypes = {
  operationId: PropTypes.string.isRequired,
}

export default Operation
