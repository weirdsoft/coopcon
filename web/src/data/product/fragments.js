import gql from 'graphql-tag'

export const productFieldsFragment = gql`
  fragment productFields on Product {
    _id
    name
    unit
    minimalFraction
    price
    creationDate
  }
`
