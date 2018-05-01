import * as R from 'ramda'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, mapProps, renderNothing, setDisplayName } from 'recompose'
import { getCurrentId } from 'data/producer/selectors'
import { goToOperationAdd, OPERATION_PRODUCTS, OPERATION_TOTALS } from 'data/route/actions'
import { getCurrentRoute } from 'data/route/selectors'
import Link from 'redux-first-router-link'
import OperationsTable from './components/OperationsTable'
import OperationProducts from './components/OperationProducts'
import OperationTotals from './components/OperationTotals'
import styles from './styles.scss'

const pageToComponent = {
  [OPERATION_PRODUCTS]: OperationProducts,
  [OPERATION_TOTALS]: OperationTotals,
}

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  currentRoute: getCurrentRoute(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  mapProps(({ currentRoute, ...props }) => ({
    ...props,
    Page: R.propOr(renderNothing(), currentRoute)(pageToComponent),
  })),
  setDisplayName('Operations'),
)

const Operations = enhancer(({ producerId, Page }) => (
  <div className={classNames('card-body', styles.operations)}>
    <div className={classNames('row', styles.tableWrapper)}>
      <OperationsTable />
      <Page />
    </div>
    <div className={styles.buttonsWrapper}>
      <Link to={goToOperationAdd(producerId)} className="btn btn-primary">
        Crear Operativo
      </Link>
    </div>
  </div>
))

export default Operations
