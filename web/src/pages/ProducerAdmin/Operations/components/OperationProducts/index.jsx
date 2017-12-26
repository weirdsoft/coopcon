import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, setDisplayName } from 'recompose'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import { isShowingOperationProducts } from 'data/operation/selectors'
import Link from 'redux-first-router-link'

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  isShowingProducts: isShowingOperationProducts(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    ({ isShowingProducts }) => !isShowingProducts,
    renderNothing,
  ),
  setDisplayName('OperationProducts'),
)

const OperationProducts = enhancer(({ producerId }) => (
  <div className="col-8">
    <div className="card">
      <div className="card-body">
        <Link to={goToOperations(producerId)} className="close">
          <span aria-hidden="true">
            ×
          </span>
        </Link>
        Products
      </div>
    </div>
  </div>
))

export default OperationProducts
