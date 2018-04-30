const definition = `
  type Operation {
    _id: ID!
    creationDate: Date!
    publishDate: Date!
    closeDate: Date!
    deliveryDate: Date!
    producer: Producer!,
    products: [Product!]!
    orders: [Order!]!
  }

  input OperationInput {
    producer: ID!
    publishDate: Date
    closeDate: Date!
    deliveryDate: Date!
  }
`

export default definition
