const definition = `
  type Product {
    _id: ID!
    name: String!
    quantity: Int!
    unit: String!
    minimalFraction: Float!
    price: Float!
    creationDate: Date!
  }

  input ProductInput {
    producer: ID!
    name: String!
    quantity: Int!
    unit: String!
    minimalFraction: Float!
    price: Float!
  }
`

export default definition
