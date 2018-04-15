import gql from 'graphql-tag'
import { producerFieldsFragment } from './fragments'

export const createProducerMutation = gql`
  mutation createProducer($producer: ProducerInput!) {
    producer: createProducer(producer: $producer) {
      ...producerFields
    }
  }
  ${producerFieldsFragment}
`
