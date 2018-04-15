import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import Main from './activities/Main'

const Bootstrap = ({ store }) => (
  <Provider store={store}>
    <PaperProvider>
      <Main/>
    </PaperProvider>
  </Provider>
)

Bootstrap.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Bootstrap
