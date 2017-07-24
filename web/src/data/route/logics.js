import { createLogic } from 'redux-logic'
import { fetchProducers } from 'data/producer/actions'
import { INDEX } from './actions'

const onIndex = createLogic({
  type: INDEX,
  process: () => fetchProducers(),
})

export default [
  onIndex,
]
