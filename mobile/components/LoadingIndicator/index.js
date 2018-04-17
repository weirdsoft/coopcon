import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native'

const LoadingIndicator = ({ loading }) => (
  <ActivityIndicator size="large" animating={loading} />
)

LoadingIndicator.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default LoadingIndicator
