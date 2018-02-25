import React from 'react';
import { configureStore } from './data/store'
import Bootstrap from './Bootstrap'

const store = configureStore()

export default App = () => (
  <Bootstrap store={store} />
)
