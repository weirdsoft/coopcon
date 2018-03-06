import React from 'react'
import { configureStore } from './data/store'
import Bootstrap from './Bootstrap'

const store = configureStore()

const App = () => (
  <Bootstrap store={store} />
)

export default App
