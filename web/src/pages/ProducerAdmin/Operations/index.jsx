import React from 'react'
import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { getCurrentProducer } from 'data/producer/selectors'
import Operation from './components/Operation'

const mapStateToProps = (state) => ({
  producer: getCurrentProducer(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  flattenProp('producer'),
  setDisplayName('Operations'),
)

const Operations = enhancer(({ operations }) => (
  <div className="card-body">
    <table className="table table-striped">
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
        </tr>
      </thead>
      <tbody>
        {operations == null ? null : operations.map((id) => (
          <Operation key={id} operationId={id} />
        ))}
      </tbody>
    </table>
  </div>
))

export default Operations
