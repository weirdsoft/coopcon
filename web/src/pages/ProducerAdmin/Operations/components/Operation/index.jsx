import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, flattenProp, mapProps, setDisplayName } from 'recompose'
import { goToOperationProducts } from 'data/route/actions'
import { getCurrentOperationId, isShowingOperationProducts } from 'data/operation/selectors'
import { getCurrentId } from 'data/producer/selectors'
import { getOperation } from 'data/operation/selectors'
import { NavLink } from 'redux-first-router-link'
import styles from './styles.scss'

const mapStateToProps = (state, { operationId }) => ({
  producerId: getCurrentId(state),
  operation: getOperation(state, operationId),
  isCompact: isShowingOperationProducts(state),
  currentOperationId: getCurrentOperationId(state),
})

const enhancer = compose(
  connect(mapStateToProps),
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
        className={styles.productsLink}
        to={goToOperationProducts(producerId, operationId)}
        activeClassName={styles.active}
      >
        <i className="fa fa-list-alt" title="Modificar Productos"></i>
      </NavLink>
    </td>
  </tr>
))

Operation.propTypes = {
  operationId: PropTypes.string.isRequired,
}

export default Operation
