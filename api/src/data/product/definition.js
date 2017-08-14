const definition = `
  type Product {
    _id: ID!
    name: String!
    quantity: Int!
    unit: String!
    price: Int!
    creationDate: Date!
  }

  input ProductInput {
    name: String!
    quantity: Int!
    unit: String!
    price: Int!
  }
`

export default definition
