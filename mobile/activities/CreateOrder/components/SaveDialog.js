import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, lifecycle, setDisplayName } from 'recompose'
import { BackHandler } from 'react-native'
import { Dialog } from 'react-native-paper'
import { hideSaveOrderDialog } from 'Coopcon/data/order/actions'
import { isPreSavingOrder } from 'Coopcon/data/order/selectors'
import SaveDialogContent from './SaveDialogContent'

const mapStateToProps = (state) => ({
  showDialog: isPreSavingOrder(state),
})

const mapDispatchToProps = (dispatch) => ({
  hideSaveOrderDialog: () => dispatch(hideSaveOrderDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    R.compose(
      R.not,
      R.prop('showDialog'),
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

const SaveDialog = enhancer(({ showDialog, hideSaveOrderDialog }) => (
  <Dialog
    visible={showDialog}
    onDismiss={hideSaveOrderDialog}
  >
    <SaveDialogContent />
  </Dialog>
))

export default SaveDialog
