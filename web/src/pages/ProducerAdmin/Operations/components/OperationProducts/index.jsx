import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, flattenProp, setDisplayName } from 'recompose'
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
    ({ isShowingProducts }) => !isShowingProducts,
    renderNothing,
  ),
  flattenProp('producer'),
  setDisplayName('OperationProducts'),
)

const OperationProducts = enhancer(({ _id, products }) => (
  <div className={classNames('col-8', styles.operationProducts)}>
    <div className={classNames('card', styles.card)}>
      <div className={classNames('card-body', styles.body)}>
        <Link to={goToOperations(_id)} className="close">
          <span aria-hidden="true">
            ×
          </span>
        </Link>
        <h4 className="card-title">
          Productos
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
