/* globals module, window */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import { connectRoutes } from 'redux-first-router'
import routes from './routes'
import appReducers from './reducers'
import appLogics from './logics'

function generateReducer(routerReducer) {
  return combineReducers({
    ...appReducers,
    location: routerReducer,
  })
}

export function configureStore(history, initialState = {}) {
  // initialize middlewares
  const router = connectRoutes(history, routes)
  const logicMiddleware = createLogicMiddleware(appLogics)

  // create store
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    generateReducer(router.reducer),
    initialState,
    composeEnhancers(
      router.enhancer,
      applyMiddleware(
        logicMiddleware,
        router.middleware,
      ),
    ),
  )

  // hot reload
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(generateReducer(router.reducer))
    })

    module.hot.accept('./logics', () => {
      logicMiddleware.replaceLogic(appLogics)
    })
  }

  return store
}
