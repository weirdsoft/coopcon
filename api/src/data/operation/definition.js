const definition = `
  type Operation {
    _id: ID!
    name: String!
    creationDate: Date!
    publishDate: Date!
    closeDate: Date!
    deliveryDate: Date!
    producer: Producer!,
    products: [Product!]!
  }

  input OperationInput {
    producer: ID!
    name: String!
    publishDate: Date
    closeDate: Date!
    deliveryDate: Date!
  }

  input OperationProductsInput {
    id: ID!
    products: [ID!]!
  }
`

export default definition
