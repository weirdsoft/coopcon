import gql from 'graphql-tag'

export const operationFieldsFragment = gql`
  fragment operationFields on Operation {
    _id
    name
    creationDate
    publishDate
    closeDate
    deliveryDate
  }
`
