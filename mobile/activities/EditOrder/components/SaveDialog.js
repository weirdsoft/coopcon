import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, setDisplayName } from 'recompose'
import { Dialog, DialogTitle, DialogContent } from 'react-native-paper'
import { isSavingOrder } from 'Coopcon/data/order/selectors'
import LoadingIndicator from 'Coopcon/components/LoadingIndicator'

const mapStateToProps = (state) => ({
  isSaving: isSavingOrder(state),
})

const enhancer = compose(
  connect(mapStateToProps),
  branch(
    R.compose(
      R.not,
      R.prop('isSaving'),
    ),
    renderNothing,
  ),
  setDisplayName('SaveDialog'),
)

const SaveDialog = enhancer(({ isSaving }) => (
  <Dialog
    visible={isSaving}
  >
    <DialogTitle>
      Guardando...
    </DialogTitle>
    <DialogContent>
      <LoadingIndicator loading={true} />
    </DialogContent>
  </Dialog>
))

export default SaveDialog
