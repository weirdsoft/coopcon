import { makeExecutableSchema } from 'graphql-tools'
import scalarResolvers from './scalars'
import { producerDefinition, producerResolver } from './producer'
import { productDefinition, productResolver } from './product'

const queryDefinition = `
  type Query {
    producers: [Producer]
    producer(id: ID!): Producer
  }

  type Mutation {
    createProducer(producer: ProducerInput!): Producer
    createProduct(product: ProductInput!): Product
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
]

const resolvers = {
  ...scalarResolvers,
  Query: {
    ...producerResolver.Query,
  },
  Mutation: {
    ...producerResolver.Mutation,
    ...productResolver.Mutation,
  },
  ...producerResolver.Nested,
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
