const definition = `
  type Product {
    _id: ID!
    name: String!
    quantity: Int!
    unit: String!
    price: Float!
    creationDate: Date!
  }

  input ProductInput {
    producer: ID!
    name: String!
    quantity: Int!
    unit: String!
    price: Float!
  }
`

export default definition
