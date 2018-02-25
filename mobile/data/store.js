import { createStore, combineReducers } from 'redux'
import appReducers from './reducers';

function generateReducer() {
  return combineReducers({
    ...appReducers,
  })
}

export function configureStore(initialState = {}) {
  // create store
  const store = createStore(
    generateReducer(),
    initialState,
  )

  return store
}
