import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getCurrentId, getCurrentProducer } from 'data/producer/selectors'
import { goToOperationAdd } from 'data/route/actions'
import Link from 'redux-first-router-link'
import Operation from './components/Operation'
import OperationAdd from './components/OperationAdd'

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  producer: getCurrentProducer(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('producer'),
  setDisplayName('Operations'),
)

const Operations = enhancer(({ producerId, operations }) => (
  <div className="card-body">
    <table className="table table-responsive-md table-striped">
      <thead>
        <tr>
          <th>
            Nombre
          </th>
          <th>
            Fecha de publicación
          </th>
          <th>
            Fecha de cierre
          </th>
          <th>
            Fecha de entrega
          </th>
          <th>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <OperationAdd />
        {operations == null ? null : operations.map((id) => (
          <Operation key={id} operationId={id} />
        ))}
      </tbody>
    </table>
    <div className="d-flex flex-row-reverse">
      <Link to={goToOperationAdd(producerId)} className="btn btn-primary">
        Crear Operativo
      </Link>
    </div>
  </div>
))

export default Operations
