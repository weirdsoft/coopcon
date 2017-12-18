import React from 'react'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, setDisplayName } from 'recompose'
import { isShowingOperationProducts } from 'data/operation/selectors'

const mapStateToProps = (state) => ({
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

const OperationProducts = enhancer(() => (
  <div className="col-8">
    Products
  </div>
))

export default OperationProducts
