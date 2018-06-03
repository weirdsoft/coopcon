import { connect } from 'react-redux'
import { compose, branch, renderNothing, flattenProp, setDisplayName } from 'recompose'
import { goToOperations } from 'data/route/actions'
import { getCurrentId } from 'data/producer/selectors'
import { changeNewOperation, addNewOperation } from 'data/operation/actions'
import { isAddingOperation, getNewOperation } from 'data/operation/selectors'
import EditableOperation from 'components/EditableOperation'

const mapStateToProps = (state) => ({
  producerId: getCurrentId(state),
  isAdding: isAddingOperation(state),
  operation: getNewOperation(state),
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (changes) => dispatch(changeNewOperation(changes)),
  onSubmit: () => dispatch(addNewOperation()),
  onCancel: (producerId) => dispatch(goToOperations(producerId)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ isAdding }) => !isAdding,
    renderNothing,
  ),
  flattenProp('operation'),
  setDisplayName('OperationAdd'),
)

const OperationAdd = enhancer(EditableOperation)

export default OperationAdd
