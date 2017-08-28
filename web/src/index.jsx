/* globals module */
import 'babel-polyfill'
import './styles-global.scss'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history'
import { configureStore } from './data/store'
import Bootstrap from './Bootstrap'

const history = createBrowserHistory()
const store = configureStore(history)

const startUpApp = () => {
  render(
    <AppContainer>
      <Bootstrap store={store} />
    </AppContainer>,
    document.getElementById('root'),
  )
}

startUpApp()

if (module.hot) {
  module.hot.accept('./Bootstrap', () => startUpApp())
}
