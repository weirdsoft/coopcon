import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, setDisplayName } from 'recompose'
import ConfirmationDialog from 'Coopcon/components/ConfirmationDialog'
import { dismissConfirmation } from 'Coopcon/data/confirmation/actions'
import {
  isConfirmationVisible, getConfirmationTitle, getConfirmationText,
} from 'Coopcon/data/confirmation/selectors'

const mapStateToProps = (state) => ({
  visible: isConfirmationVisible(state),
  title: getConfirmationTitle(state),
  text: getConfirmationText(state),
})

const mapDispatchToProps = (dispatch) => ({
  onConfirm: () => dispatch(dismissConfirmation(true)),
  onCancel: () => dispatch(dismissConfirmation(false)),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    R.compose(R.not, R.prop('visible')),
    renderNothing,
  ),
  setDisplayName('ConfirmationDialog'),
)

export default enhancer(ConfirmationDialog)
