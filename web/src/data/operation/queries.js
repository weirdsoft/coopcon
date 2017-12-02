import gql from 'graphql-tag'
import { operationFieldsFragment } from './fragments'

export const producerOperationsQuery = gql`
  query producerOperations($producerId: ID!) {
    producer(id: $producerId) {
      _id
      operations {
        ...operationFields
      }
    }
  }
  ${operationFieldsFragment}
`
