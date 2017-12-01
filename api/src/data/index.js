import { makeExecutableSchema } from 'graphql-tools'
import scalarResolvers from './scalars'
import { producerDefinition, producerResolver } from './producer'
import { productDefinition, productResolver } from './product'
import { operationDefinition, operationResolver } from './operation'

const queryDefinition = `
  type Query {
    producers: [Producer]
    producer(id: ID!): Producer
  }

  type Mutation {
    createProducer(producer: ProducerInput!): Producer
    createProduct(product: ProductInput!): Product
    createOperation(operation: OperationInput!): Operation
  }
`

const scalarDefinitions = `
  scalar Date
`

const typeDefs = [
  scalarDefinitions,
  queryDefinition,
  producerDefinition,
  productDefinition,
  operationDefinition,
]

const resolvers = {
  ...scalarResolvers,
  Query: {
    ...producerResolver.Query,
  },
  Mutation: {
    ...producerResolver.Mutation,
    ...productResolver.Mutation,
    ...operationResolver.Mutation,
  },
  ...producerResolver.Nested,
  ...operationResolver.Nested,
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
