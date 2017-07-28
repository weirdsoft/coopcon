import { createLogic } from 'redux-logic'
import { query, mutate } from 'data/api'
import {
  FETCH_PRODUCERS_REQUEST, receiveProducers, failReceiveProducers,
  CREATE_NEW_PRODUCER, addProducer, failAddProducer,
} from './actions'
import { getNewProducer } from './selectors'
import { allProducersQuery } from './queries'
import { createProducerMutation } from './mutations'

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

const createProducer = createLogic({
  type: CREATE_NEW_PRODUCER,
  processOptions: {
    successType: addProducer,
    failType: failAddProducer,
  },
  process: async({ getState }) => {
    const producer = getNewProducer(getState())
    const response = await mutate(createProducerMutation, { producer })
    return response.producer
  },
})

export default [
  fetchProducers,
  createProducer,
]
