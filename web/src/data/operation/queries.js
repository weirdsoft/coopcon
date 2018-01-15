import gql from 'graphql-tag'

export const operationProductsQuery = gql`
  query operationProductsQuery($id: ID!) {
    operation(id: $id) {
      products {
        _id
      }
    }
  }
`
