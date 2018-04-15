const definition = `
  type Order {
    _id: ID!
    user: String!
    creationDate: Date!
    operation: Operation!
    products: [OrderProduct!]!
  }

  type OrderProduct {
    product: Product!
    quantity: Float!
  }

  input OrderInput {
    user: String!
    operation: ID!
  }

  input OrderProductInput {
    product: ID!
    quantity: Float!
  }
`

export default definition
