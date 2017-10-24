/* globals module, window */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRoutes } from 'redux-first-router'
import routes from './routes'
import appReducers from './reducers'
import appSagas from './sagas'

function generateReducer(routerReducer) {
  return combineReducers({
    ...appReducers,
    location: routerReducer,
  })
}

const runSagas = (middleware) => {
  return middleware.run(appSagas)
}

export function configureStore(history, initialState = {}) {
  // initialize middlewares
  const router = connectRoutes(history, routes)
  const sagaMiddleware = createSagaMiddleware()

  // create store
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    generateReducer(router.reducer),
    initialState,
    composeEnhancers(
      router.enhancer,
      applyMiddleware(
        sagaMiddleware,
        router.middleware,
      ),
    ),
  )

  // apply sagas
  let currentSagas = runSagas(sagaMiddleware)

  // hot reload
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(generateReducer(router.reducer))
    })

    module.hot.accept('./sagas', async() => {
      currentSagas.cancel()
      await currentSagas.done
      currentSagas = runSagas(sagaMiddleware)
    })
  }

  return store
}
