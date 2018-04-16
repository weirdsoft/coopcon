import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, branch, renderNothing, lifecycle, setDisplayName } from 'recompose'
import { BackHandler } from 'react-native'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextInput, Button,
} from 'react-native-paper'
import { hideSaveOrderDialog, changeOrderUser, saveNewOrder } from 'Coopcon/data/order/actions'
import { isSaving, getCreatingUser } from 'Coopcon/data/order/selectors'

const mapStateToProps = (state) => ({
  isSaving: isSaving(state),
  creatingUser: getCreatingUser(state),
})

const mapDispatchToProps = (dispatch) => ({
  hideSaveOrderDialog: () => dispatch(hideSaveOrderDialog()),
  changeOrderUser: (user) => dispatch(changeOrderUser(user)),
  saveNewOrder: () => dispatch(saveNewOrder()),
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

const SaveDialog = enhancer(({
  isSaving, creatingUser, hideSaveOrderDialog, changeOrderUser, saveNewOrder,
}) => (
  <Dialog
    visible={isSaving}
    onDismiss={hideSaveOrderDialog}
  >
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
  </Dialog>
))

export default SaveDialog
