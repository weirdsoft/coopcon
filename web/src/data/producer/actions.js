export const FETCH_PRODUCERS_REQUEST = 'FETCH_PRODUCERS_REQUEST'
export const FETCH_PRODUCERS_SUCCESS = 'FETCH_PRODUCERS_SUCCESS'
export const FETCH_PRODUCERS_FAILURE = 'FETCH_PRODUCERS_FAILURE'
export const FETCH_PRODUCER_REQUEST = 'FETCH_PRODUCER_REQUEST'
export const FETCH_PRODUCER_SUCCESS = 'FETCH_PRODUCER_SUCCESS'
export const FETCH_PRODUCER_FAILURE = 'FETCH_PRODUCER_FAILURE'
export const SHOW_ADD_NEW_PRODUCER = 'SHOW_ADD_NEW_PRODUCER'
export const HIDE_ADD_NEW_PRODUCER = 'HIDE_ADD_NEW_PRODUCER'
export const CHANGE_NEW_PRODUCER_NAME = 'CHANGE_NEW_PRODUCER_NAME'
export const CREATE_NEW_PRODUCER = 'CREATE_NEW_PRODUCER'
export const ADD_PRODUCER_SUCCESS = 'ADD_PRODUCER_SUCCESS'
export const ADD_PRODUCER_FAILURE = 'ADD_PRODUCER_FAILURE'

export const fetchProducers = () =>({
  type: FETCH_PRODUCERS_REQUEST,
})

export const receiveProducers = (producers) => ({
  type: FETCH_PRODUCERS_SUCCESS,
  producers,
})

export const failReceiveProducers = (reason) => ({
  type: FETCH_PRODUCERS_FAILURE,
  reason,
})

export const fetchProducer = (id) =>({
  type: FETCH_PRODUCER_REQUEST,
  id,
})

export const receiveProducer = (producer) => ({
  type: FETCH_PRODUCER_SUCCESS,
  producer,
})

export const failReceiveProducer = (reason) => ({
  type: FETCH_PRODUCER_FAILURE,
  reason,
})

export const showAddNewProducer = () => ({
  type: SHOW_ADD_NEW_PRODUCER,
})

export const hideAddNewProducer = () => ({
  type: HIDE_ADD_NEW_PRODUCER,
})

export const changeNewProducerName = (name) => ({
  type: CHANGE_NEW_PRODUCER_NAME,
  name,
})

export const createNewProducer = () => ({
  type: CREATE_NEW_PRODUCER,
})

export const addProducer = (producer) => ({
  type: ADD_PRODUCER_SUCCESS,
  producer,
})

export const failAddProducer = (reason) => ({
  type: ADD_PRODUCER_FAILURE,
  reason,
})
