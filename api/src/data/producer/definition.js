const definition = `
  type Producer {
    _id: ID!
    name: String!
    creationDate: Date!
    products: [Product!]!
  }

  input ProducerInput {
    name: String!
  }
`

export default definition
