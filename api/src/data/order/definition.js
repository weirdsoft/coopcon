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
    quantity: Int!
  }

  input OrderInput {
    user: String!
    operation: ID!
  }
`

export default definition
