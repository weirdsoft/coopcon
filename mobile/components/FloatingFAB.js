import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { compose, branch, renderNothing, setPropTypes, setDisplayName } from 'recompose'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
})

const enhancer = compose(
  branch(
    R.compose(R.not, R.propOr(true, 'display')),
    renderNothing,
  ),
  setPropTypes({
    icon: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    display: PropTypes.bool,
  }),
  setDisplayName('FloatingFAB'),
)

const FloatingFAB = enhancer(({ icon, action }) => (
  <View style={styles.buttonContainer}>
    <FAB
      onPress={action}
      icon={icon}
    />
  </View>
))

export default FloatingFAB
