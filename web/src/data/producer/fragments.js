import gql from 'graphql-tag'

export const producerFieldsFragment = gql`
  fragment producerFields on Producer {
    _id
    name
    creationDate
  }
`
