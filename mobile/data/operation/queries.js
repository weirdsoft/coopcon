import gql from 'graphql-tag'

export const operationsQuery = gql`
  query operationsQuery {
    operations {
      _id
      name
    }
  }
`

export const operationOrdersQuery = gql`
  query operationOrdersQuery($id: ID!) {
    operation(id: $id) {
      orders {
        _id
        user
        creationDate
        products {
          quantity
          product {
            _id
            name
            unit
            price
          }
        }
      }
    }
  }
`
