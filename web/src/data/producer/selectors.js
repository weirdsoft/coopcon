import { createSelector } from 'reselect'
import { getOperations } from 'data/operation/selectors'

export const getProducers = (state) => state.producer.list
export const getSortedProducers = createSelector(
  [ getProducers ],
  (producers) => producers.slice(0).sort((a, b) => (a.creationDate - b.creationDate)),
)
export const isLoadingProducers = (state) => state.producer.isLoading
export const isAddingNewProducer = (state) => state.producer.isAdding
export const getNewProducer = (state) => state.producer.add
export const getCurrentId = (state) => state.producer.currentId
export const getCurrentProducer = createSelector(
  [ getProducers, getCurrentId ],
  (producers, id) => producers.find((producer) => producer._id === id),
)
export const getCurrentProducerSortedOperations = createSelector(
  [ getCurrentProducer, getOperations ],
  (producer, operations) => producer == null || producer.operations == null ?
    [] :
    producer.operations.slice().sort((a, b) => (
      operations[b].publishDate - operations[a].publishDate
    )),
)
