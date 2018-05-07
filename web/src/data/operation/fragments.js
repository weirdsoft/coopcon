import gql from 'graphql-tag'

export const operationFieldsFragment = gql`
  fragment operationFields on Operation {
    _id
    creationDate
    publishDate
    closeDate
    deliveryDate
  }
`
