import { createLogic } from 'redux-logic'
import { query } from 'data/api'
import { FETCH_PRODUCERS_REQUEST, receiveProducers, failReceiveProducers } from './actions'
import { allProducersQuery } from './queries'

const fetchProducers = createLogic({
  type: FETCH_PRODUCERS_REQUEST,
  processOptions: {
    successType: receiveProducers,
    failType: failReceiveProducers,
  },
  process: async() => {
    const response = await query(allProducersQuery)
    return response.producers
  },
})

export default [
  fetchProducers,
]
