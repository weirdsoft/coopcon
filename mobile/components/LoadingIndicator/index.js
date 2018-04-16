import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

const LoadingIndicator = ({ loading }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" animating={loading} />
  </View>
)

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
}

export default LoadingIndicator
