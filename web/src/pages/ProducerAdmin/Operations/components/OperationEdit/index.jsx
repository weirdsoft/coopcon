import { connect } from 'react-redux'
import { compose, flattenProp, setDisplayName } from 'recompose'
import { goToOperations } from 'data/route/actions'
import { changeEditingOperation, updateOperation } from 'data/operation/actions'
import { getEditingOperation } from 'data/operation/selectors'
import EditableOperation from 'components/EditableOperation'

const mapStateToProps = (state) => ({
  operation: getEditingOperation(state),
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (changes) => dispatch(changeEditingOperation(changes)),
  onSubmit: () => dispatch(updateOperation()),
  onCancel: (producerId) => dispatch(goToOperations(producerId)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  flattenProp('operation'),
  setDisplayName('OperationEdit'),
)

const OperationAdd = enhancer(EditableOperation)

export default OperationAdd
