import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'

const LoadingIndicator = ({ loading }) => (
  <View>
    <ActivityIndicator size="large" animating={loading} />
  </View>
)

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
}

export default LoadingIndicator
