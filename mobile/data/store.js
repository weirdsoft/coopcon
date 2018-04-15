/* globals module, window */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import {
  createActionEnhancerMiddleware, replaceActionEnhancers,
} from './action-enhancer-middleware'
import appReducers from './reducers'
import initSagas from './init-sagas'
import appSagas from './sagas'
import appEnhancers from './enhancers'

function generateReducer(reducers) {
  return combineReducers({
    ...reducers,
  })
}

export function configureStore(initialState = {}) {
  // initialize middlewares
  const actionEnhancerMiddleware = createActionEnhancerMiddleware(appEnhancers)
  const sagaMiddleware = createSagaMiddleware()
  const navMiddleware = createReactNavigationReduxMiddleware(
    'mainStack',
    (state) => state.navigation,
  )

  // create store
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    generateReducer(appReducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        actionEnhancerMiddleware,
        sagaMiddleware,
        navMiddleware,
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
      store.replaceReducer(generateReducer(require('./reducers').default))

      // replace action enhancers
      replaceActionEnhancers(require('./enhancers').default)

      // restart sagas
      currentSagas.cancel()
      await currentSagas.done
      currentSagas = sagaMiddleware.run(require('./sagas').default)
    })
  }

  return store
}
