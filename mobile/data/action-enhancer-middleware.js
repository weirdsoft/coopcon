let enhancers = null

export const createActionEnhancerMiddleware = (initialEnhancers) => {
  enhancers = initialEnhancers

  return (store) => (next) => (action) => {
    if (action.type in enhancers) {
      // if there's an enhancer for this action, send it to it
      action = enhancers[action.type](store.getState, action)
    }

    return next(action)
  }
}

export const replaceActionEnhancers = (newEnhancers) => {
  enhancers = newEnhancers
}
