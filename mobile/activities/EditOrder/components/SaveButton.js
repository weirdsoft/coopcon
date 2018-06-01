import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import { Button } from 'react-native-paper'
import { hasEditingProducts } from 'Coopcon/data/order/selectors'
import { saveOrder } from 'Coopcon/data/order/actions'

const mapStateToProps = (state) => ({
  hasEditingProducts: hasEditingProducts(state),
})

const mapDispatchToprops = (dispatch) => ({
  saveOrder: () => dispatch(saveOrder()),
})

const enhancer = compose(
  connect(mapStateToProps, mapDispatchToprops),
  setDisplayName('SaveButton'),
)

const SaveButton = enhancer(({ hasEditingProducts, saveOrder }) => (
  <Button
    onPress={saveOrder}
    color="#fff"
    disabled={R.not(hasEditingProducts)}
  >
    Guardar
  </Button>
))

export default SaveButton
