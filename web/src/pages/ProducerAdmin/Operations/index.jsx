import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { getCurrentId } from 'data/producer/selectors'
import { goToOperationAdd } from 'data/route/actions'
import Link from 'redux-first-router-link'
import OperationsTable from './components/OperationsTable'
import OperationProducts from './components/OperationProducts'
import styles from './styles.scss'

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  setDisplayName('Operations'),
)

const Operations = enhancer(({ producerId }) => (
  <div className={classNames('card-body', styles.operations)}>
    <div className={classNames('row', styles.tableWrapper)}>
      <OperationsTable />
      <OperationProducts />
    </div>
    <div className={styles.buttonsWrapper}>
      <Link to={goToOperationAdd(producerId)} className="btn btn-primary">
        Crear Operativo
      </Link>
    </div>
  </div>
))

export default Operations
