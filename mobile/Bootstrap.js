import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Main from './activities/Main'

const Bootstrap = ({ store }) => (
  <Provider store={store}>
    <Main/>
  </Provider>
)

Bootstrap.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Bootstrap
