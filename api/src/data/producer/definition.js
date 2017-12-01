const definition = `
  type Producer {
    _id: ID!
    name: String!
    creationDate: Date!
    products: [Product!]!
    operations: [Operation!]!
  }

  input ProducerInput {
    name: String!
  }
`

export default definition
