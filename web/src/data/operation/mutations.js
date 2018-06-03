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

export const updateOperationMutation = gql`
  mutation updateOperation($id: ID!, $operation: OperationInput!) {
    operation: updateOperation(id: $id, operation: $operation) {
      ...operationFields
    }
  }
  ${operationFieldsFragment}
`

export const addOperationProductMutation = gql`
  mutation addOperationProduct($id: ID!, $productId: ID!) {
    result: addOperationProduct(id: $id, productId: $productId)
  }
`

export const removeOperationProductMutation = gql`
  mutation removeOperationProduct($id: ID!, $productId: ID!) {
    result: removeOperationProduct(id: $id, productId: $productId)
  }
`
