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
    name: String!
    publishDate: Date
    closeDate: Date!
    deliveryDate: Date!
    producer: ID!
    products: [ID!]!
  }
`

export default definition
