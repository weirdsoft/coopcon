import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, lifecycle, setDisplayName } from 'recompose'
import { BackHandler } from 'react-native'
import { Dialog } from 'react-native-paper'
import { hideSaveOrderDialog } from 'Coopcon/data/order/actions'
import { isSavingOrder } from 'Coopcon/data/order/selectors'
import SaveDialogContent from './SaveDialogContent'

const mapStateToProps = (state) => ({
  isSaving: isSavingOrder(state),
})

const mapDispatchToProps = (dispatch) => ({
  hideSaveOrderDialog: () => dispatch(hideSaveOrderDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    R.compose(
      R.not,
      R.prop('isSaving'),
    ),
    renderNothing,
  ),
  lifecycle({
    componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", this.props.hideSaveOrderDialog)
    },
    componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", this.props.hideSaveOrderDialog)
    },
  }),
  setDisplayName('SaveDialog'),
)

const SaveDialog = enhancer(({ isSaving, hideSaveOrderDialog }) => (
  <Dialog
    visible={isSaving}
    onDismiss={hideSaveOrderDialog}
  >
    <SaveDialogContent />
  </Dialog>
))

export default SaveDialog
