import gql from 'graphql-tag'

export const operationsQuery = gql`
  query operationsQuery {
    operations {
      _id
      publishDate

      producer {
        _id
        name
      }
    }
  }
`

export const operationOrdersQuery = gql`
  query operationOrdersQuery($id: ID!) {
    operation(id: $id) {
      products {
        _id
        name
        quantity
        unit
        minimalFraction
        price
      }
      orders {
        _id
        user
        creationDate
        paid
        products {
          quantity
          product {
            _id
          }
        }
      }
    }
  }
`
