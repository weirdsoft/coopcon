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

export const editProductMutation = gql`
  mutation editProduct($id: ID!, $product: ProductInput!) {
    product: editProduct(id: $id, product: $product) {
      ...productFields
    }
  }
  ${productFieldsFragment}
`
