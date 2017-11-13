import gql from 'graphql-tag'
import { productFieldsFragment } from './fragments'

export const producerProductsQuery = gql`
  query producerProducts($producerId: ID!) {
    producer(id: $producerId) {
      _id
      products {
        ...productFields
      }
    }
  }
  ${productFieldsFragment}
`
