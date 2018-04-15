import gql from 'graphql-tag'
import { producerFieldsFragment } from './fragments'
import { operationFieldsFragment } from 'data/operation/fragments'
import { productFieldsFragment } from 'data/product/fragments'

export const allProducersQuery = gql`
  query allProducers {
    producers {
      ...producerFields
    }
  }
  ${producerFieldsFragment}
`

export const producerQuery = gql`
  query producer($id: ID!) {
    producer(id: $id) {
      _id

      operations {
        ...operationFields
      }

      products {
        ...productFields
      }
    }
  }
  ${operationFieldsFragment}
  ${productFieldsFragment}
`
