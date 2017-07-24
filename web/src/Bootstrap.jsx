import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import App from 'pages/App'

const Bootstrap = ({ store }) => (
  <Provider store={store}>
    <App/>
  </Provider>
)

Bootstrap.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Bootstrap
