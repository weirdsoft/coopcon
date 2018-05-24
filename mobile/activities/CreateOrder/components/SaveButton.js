import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { Button } from 'react-native-paper'
import { showSaveOrderDialog } from 'Coopcon/data/order/actions'
import { hasEditingProducts } from 'Coopcon/data/order/selectors'

const mapStateToProps = (state) => ({
  hasEditingProducts: hasEditingProducts(state),
})

const mapDispatchToprops = (dispatch) => ({
  showSaveOrderDialog: () => dispatch(showSaveOrderDialog()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToprops),
  setDisplayName('SaveButton'),
)

const SaveButton = enhancer(({ hasEditingProducts, showSaveOrderDialog }) => (
  <Button
    onPress={showSaveOrderDialog}
    color="#fff"
    disabled={R.not(hasEditingProducts)}
  >
    Guardar
  </Button>
))

export default SaveButton
