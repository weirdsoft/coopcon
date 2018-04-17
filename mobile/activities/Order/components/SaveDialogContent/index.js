import React, { Fragment } from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderComponent, setDisplayName } from 'recompose'
import { DialogTitle, DialogContent, DialogActions, TextInput, Button } from 'react-native-paper'
import { hideSaveOrderDialog, changeOrderUser, saveNewOrder } from 'Coopcon/data/order/actions'
import { getCreatingUser, isCreatingOrder } from 'Coopcon/data/order/selectors'
import SaveDialogCreating from '../SaveDialogCreating'

const mapStateToProps = (state) => ({
  creatingUser: getCreatingUser(state),
  isCreating: isCreatingOrder(state),
})

const mapDispatchToProps = (dispatch) => ({
  hideSaveOrderDialog: () => dispatch(hideSaveOrderDialog()),
  changeOrderUser: (user) => dispatch(changeOrderUser(user)),
  saveNewOrder: () => dispatch(saveNewOrder()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    R.prop('isCreating'),
    renderComponent(SaveDialogCreating),
  ),
  setDisplayName('SaveDialogContent'),
)

const SaveDialogContent = enhancer(({
  creatingUser, hideSaveOrderDialog, changeOrderUser, saveNewOrder,
}) => (
  <Fragment >
    <DialogTitle>
      ¿A nombre de quien?
    </DialogTitle>
    <DialogContent>
      <TextInput
        label="Nombre"
        value={creatingUser}
        onChangeText={changeOrderUser}
      />
    </DialogContent>
    <DialogActions>
      <Button raised
        onPress={hideSaveOrderDialog}
      >
        Cancelar
      </Button>
      <Button primary raised
        onPress={saveNewOrder}
      >
        Guardar
      </Button>
    </DialogActions>
  </Fragment>
))

export default SaveDialogContent
