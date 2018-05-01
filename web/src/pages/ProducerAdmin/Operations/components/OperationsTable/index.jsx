import React from 'react'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { getCurrentProducerSortedOperations } from 'data/producer/selectors'
import { isShowingOperationSidepanel } from 'data/operation/selectors'
import Operation from '../Operation'
import OperationAdd from '../OperationAdd'

const mapStateToProps = (state) => ({
  isCompact: isShowingOperationSidepanel(state),
  operations: getCurrentProducerSortedOperations(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  setDisplayName('Operations'),
)

const OperationsTable = enhancer(({ isCompact, operations }) => (
  <div className={isCompact ? 'col-4' : 'col-12'}>
    <table className="table table-responsive-md table-striped">
      <thead>
        <tr>
          <th>
            Fecha de publicación
          </th>
          { isCompact ? null :
            <th>
              Fecha de cierre
            </th>
          }
          { isCompact ? null :
            <th>
              Fecha de entrega
            </th>
          }
          <th>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <OperationAdd />
        {operations.map((id) => (
          <Operation key={id} operationId={id} />
        ))}
      </tbody>
    </table>
  </div>
))

export default OperationsTable
