import gql from 'graphql-tag'

export const userQuery = gql`
  query userQuery {
    me {
      name
      email
      photo
      role
    }
  }
`
