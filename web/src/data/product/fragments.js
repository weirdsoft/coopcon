import gql from 'graphql-tag'

export const productFieldsFragment = gql`
  fragment productFields on Product {
    _id
    name
    unit
    quantity
    price
    creationDate
  }
`
