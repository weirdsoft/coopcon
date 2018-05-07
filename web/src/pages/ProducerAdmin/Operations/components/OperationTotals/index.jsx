import * as R from 'ramda'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, mapProps, setDisplayName } from 'recompose'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import { getCurrentOperation } from 'data/operation/selectors'
import styles from './styles.scss'
import Link from 'redux-first-router-link'

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  operation: getCurrentOperation(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    R.compose(R.isNil, R.path([ 'operation', 'totals' ])),
    renderNothing,
  ),
  mapProps(({ operation: { totals }, ...props }) => {
    const header = R.compose(
      R.prepend('Productos'),
      R.sortBy(R.identity),
      R.uniq,
      R.pluck('quantity'),
      R.chain(R.prop('totals')),
    )(totals)

    const body = R.map(({ name, unit, totals }) => R.prepend(
      `${name} (x ${unit})`,
      R.map(R.compose(
        R.propOr('-', 'total'),
        (quantity) => R.find(R.propEq('quantity', quantity))(totals),
      ))(R.tail(header)),
    ))(totals)

    return {
      ...props,
      header,
      body,
    }
  }),
  setDisplayName('OperationTotals'),
)

const OperationProducts = enhancer(({ producerId, header, body }) => (
  <div className={classNames('col-8', styles.operationProducts)}>
    <div className={classNames('card', styles.card)}>
      <div className={classNames('card-body', styles.body)}>
        <Link to={goToOperations(producerId)} className="close">
          <span aria-hidden="true">
            ×
          </span>
        </Link>
        <p className="card-text">
          Sumario de totales por producto de la operación
        </p>
      </div>
      <table className={classNames('table', 'table-striped', styles.totals)}>
        <thead>
          <tr>
            {R.map((header) => (
              <th key={header}>
                {header}
              </th>
            ))(header)}
          </tr>
        </thead>
        <tbody>
          {R.addIndex(R.map)((row, index) => (
            <tr key={index}>
              {R.addIndex(R.map)((value, index) => (
                <td key={index}>
                  {value}
                </td>
              ))(row)}
            </tr>
          ))(body)}
        </tbody>
      </table>
    </div>
  </div>
))

export default OperationProducts
