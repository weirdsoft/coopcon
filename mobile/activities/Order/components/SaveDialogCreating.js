import React, { Fragment } from 'react'
import { DialogTitle, DialogContent } from 'react-native-paper'
import LoadingIndicator from 'Coopcon/components/LoadingIndicator'

const SaveDialogCreating = () => (
  <Fragment >
    <DialogTitle>
      Guardando...
    </DialogTitle>
    <DialogContent>
      <LoadingIndicator loading={true} />
    </DialogContent>
  </Fragment>
)

export default SaveDialogCreating
