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
      <Button onPress={onCancel}>
        Cancelar
      </Button>
      <Button onPress={onConfirm} primary>
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
