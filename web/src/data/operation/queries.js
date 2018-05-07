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

export const operationTotalsQuery = gql`
  query operationTotalsQuery($id: ID!) {
    operation(id: $id) {
      totals {
        name
        unit
        totals {
          quantity
          total
        }
      }
    }
  }
`
