/* globals module, window */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import appReducers from './reducers'
import initSagas from './init-sagas'
import appSagas from './sagas'

function generateReducer() {
  return combineReducers({
    ...appReducers,
  })
}

export function configureStore(initialState = {}) {
  // initialize middlewares
  const sagaMiddleware = createSagaMiddleware()

  // create store
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    generateReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  )

  // run sagas
  let currentSagas = sagaMiddleware.run(appSagas)

  // run init sagas (doesn't get hot-reloaded)
  sagaMiddleware.run(initSagas)

  // hot reload
  if (module.hot) {
    module.hot.accept(async() => {
      // replace reducer
      store.replaceReducer(generateReducer())

      // restart sagas
      currentSagas.cancel()
      await currentSagas.done
      currentSagas = sagaMiddleware.run(appSagas)
    })
  }

  return store
}
