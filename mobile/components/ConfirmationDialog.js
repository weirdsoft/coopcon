import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Paragraph, Button,
} from 'react-native-paper'

const ConfirmDialog = ({ title, text, onCancel, onConfirm }) => (
  <Dialog
    visible={true}
    onDismiss={onCancel}
  >
    <DialogTitle>
      {title}
    </DialogTitle>
    <DialogContent>
      <Paragraph>
        {text}
      </Paragraph>
    </DialogContent>
    <DialogActions>
      <Button raised
        onPress={onCancel}
      >
        Cancelar
      </Button>
      <Button primary raised
        onPress={onConfirm}
      >
        Continuar
      </Button>
    </DialogActions>
  </Dialog>
)

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default ConfirmDialog
