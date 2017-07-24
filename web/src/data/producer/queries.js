import gql from 'graphql-tag'
import { producerFieldsFragment } from './fragments'

export const allProducersQuery = gql`
  query allProducers {
    producers {
      ...producerFields
    }
  }
  ${producerFieldsFragment}
`
