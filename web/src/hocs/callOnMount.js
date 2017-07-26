/* globals process */
import { lifecycle, setDisplayName, wrapDisplayName } from 'recompose'

const callOnMount = (...propNames) => {
  const hoc = lifecycle({
    componentDidMount() {
      propNames.forEach((propName) => this.props[propName](this.props))
    },
  })
  if (process.env.NODE_ENV !== 'production') {
    return BaseComponent =>
      setDisplayName(wrapDisplayName(BaseComponent, 'callOnMount'))(hoc(BaseComponent))
  }
  return hoc
}

export default callOnMount
