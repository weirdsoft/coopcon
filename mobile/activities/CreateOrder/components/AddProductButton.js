import { connect } from 'react-redux'
import { compose, withProps, setDisplayName } from 'recompose'
import FloatingFAB from 'Coopcon/components/FloatingFAB'
import { showAddOrderProductDialog } from 'Coopcon/data/order/actions'
import { hasOrderAvailableProducts } from 'Coopcon/data/order/selectors'

const mapStateToProps = (state) => ({
  display: hasOrderAvailableProducts(state),
})

const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(showAddOrderProductDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({
    icon: 'add',
  }),
  setDisplayName('AddProductButton'),
)

const AddProductButton = enhancer(FloatingFAB)

export default AddProductButton
