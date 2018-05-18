import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { Button } from 'react-native-paper'
import { showSaveOrderDialog } from 'Coopcon/data/order/actions'
import { hasCreatingProducts } from 'Coopcon/data/order/selectors'

const mapStateToProps = (state) => ({
  hasCreatingProducts: hasCreatingProducts(state),
})

const mapDispatchToprops = (dispatch) => ({
  showSaveOrderDialog: () => dispatch(showSaveOrderDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToprops),
  setDisplayName('SaveButton'),
)

const SaveButton = enhancer(({ hasCreatingProducts, showSaveOrderDialog }) => (
  <Button
    onPress={showSaveOrderDialog}
    color="#fff"
    disabled={R.not(hasCreatingProducts)}
  >
    Guardar
  </Button>
))

export default SaveButton
