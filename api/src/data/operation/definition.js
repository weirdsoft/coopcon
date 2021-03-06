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
    totals: [Totals!]!
  }

  type Totals {
    name: String!
    unit: String!
    totals: [Total!]!
  }

  type Total {
    quantity: Float!
    total: Int!
  }

  input OperationInput {
    producer: ID!
    publishDate: Date
    closeDate: Date!
    deliveryDate: Date!
  }
`

export default definition
