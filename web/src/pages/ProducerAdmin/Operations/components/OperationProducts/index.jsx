import * as R from 'ramda'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, mapProps, setDisplayName } from 'recompose'
import { goToOperations } from 'data/route/actions'
import { getCurrentProducer } from 'data/producer/selectors'
import { getCurrentOperation, isShowingOperationProducts } from 'data/operation/selectors'
import styles from './styles.scss'
import Link from 'redux-first-router-link'
import OperationProduct from '../OperationProduct'

const mapStateToProps = (state) => ({
  producer: getCurrentProducer(state),
  operation: getCurrentOperation(state),
  isShowingProducts: isShowingOperationProducts(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    R.anyPass([
      R.propSatisfies(R.isNil, 'producer'),
      R.propSatisfies(R.isNil, 'operation'),
      R.propSatisfies(R.not, 'isShowingProducts'),
    ]),
    renderNothing,
  ),
  mapProps(({ producer, operation }) => ({
    producerId: producer._id,
    products: producer.products,
    name: operation.name,
  })),
  setDisplayName('OperationProducts'),
)

const OperationProducts = enhancer(({ name, producerId, products }) => (
  <div className={classNames('col-8', styles.operationProducts)}>
    <div className={classNames('card', styles.card)}>
      <div className={classNames('card-body', styles.body)}>
        <Link to={goToOperations(producerId)} className="close">
          <span aria-hidden="true">
            ×
          </span>
        </Link>
        <h4 className="card-title">
          Productos de <i>{name}</i>
        </h4>
        <p className="card-text">
          Los productos seleccionados serán incluidos en el operativo.
        </p>
      </div>
      <ul className={classNames('list-group', 'list-group-flush', styles.products)}>
        {products == null ? null : products.map((productId) => (
          <OperationProduct key={productId} productId={productId} />
        ))}
      </ul>
    </div>
  </div>
))

export default OperationProducts
