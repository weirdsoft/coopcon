import * as R from 'ramda'
import orderEnhancers from './order/enhancers'

export default R.mergeAll(
  orderEnhancers,
)
