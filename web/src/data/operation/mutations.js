import gql from 'graphql-tag'
import { operationFieldsFragment } from './fragments'

export const createOperationMutation = gql`
  mutation createOperation($operation: OperationInput!) {
    operation: createOperation(operation: $operation) {
      ...operationFields
    }
  }
  ${operationFieldsFragment}
`
