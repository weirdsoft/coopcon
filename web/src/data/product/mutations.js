import gql from 'graphql-tag'
import { productFieldsFragment } from './fragments'

export const createProductMutation = gql`
  mutation createProduct($product: ProductInput!) {
    product: createProduct(product: $product) {
      ...productFields
    }
  }
  ${productFieldsFragment}
`
