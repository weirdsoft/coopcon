import * as R from 'ramda'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, mapProps, setDisplayName } from 'recompose'
import { goToOperations } from 'data/route/actions'
import { getCurrentProducer } from 'data/producer/selectors'
import { isShowingOperationProducts } from 'data/operation/selectors'
import styles from './styles.scss'
import Link from 'redux-first-router-link'
import OperationProduct from '../OperationProduct'

const mapStateToProps = (state) => ({
  producer: getCurrentProducer(state),
  isShowingProducts: isShowingOperationProducts(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    R.anyPass([
      R.propSatisfies(R.isNil, 'producer'),
      R.propSatisfies(R.not, 'isShowingProducts'),
    ]),
    renderNothing,
  ),
  mapProps(({ producer }) => ({
    producerId: producer._id,
    products: producer.products,
  })),
  setDisplayName('OperationProducts'),
)

const OperationProducts = enhancer(({ producerId, products }) => (
  <div className={classNames('col-8', styles.operationProducts)}>
    <div className={classNames('card', styles.card)}>
      <div className={classNames('card-body', styles.body)}>
        <Link to={goToOperations(producerId)} className="close">
          <span aria-hidden="true">
            ×
          </span>
        </Link>
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
