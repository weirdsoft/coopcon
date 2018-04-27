/* globals process */
import * as R from 'ramda'
import { branch, renderComponent, setDisplayName, wrapDisplayName } from 'recompose'
import LoadingIndicator from 'Coopcon/components/LoadingIndicator'

const withLoadingIndicator = (loadingFlag = 'loading') => {
  const hoc = branch(
    R.prop(loadingFlag),
    renderComponent(LoadingIndicator),
  )

  if (process.env.NODE_ENV !== 'production') {
    return BaseComponent =>
      setDisplayName(wrapDisplayName(BaseComponent, 'withLoadingIndicator'))(
        hoc(BaseComponent),
      )
  }

  return hoc
}

export default withLoadingIndicator
