import '@babel/polyfill'
import './styles-global.scss'
import React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { configureStore } from './data/store'
import Bootstrap from './Bootstrap'

const history = createBrowserHistory()
const store = configureStore(history)

render(
  <Bootstrap store={store} />,
  document.getElementById('root'),
)
