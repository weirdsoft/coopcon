import gql from 'graphql-tag'

export const operationsQuery = gql`
  query operationsQuery {
    operations {
      _id
      name
    }
  }
`
