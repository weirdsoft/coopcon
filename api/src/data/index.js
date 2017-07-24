import { makeExecutableSchema } from 'graphql-tools'
import scalarResolvers from './scalars'
import { producerDefinition, producerResolver } from './producer'

const queryDefinition = `
  type Query {
    producers: [Producer]
  }

  type Mutation {
    createProducer(producer: ProducerInput!): Producer
  }
`

const scalarDefinitions = `
  scalar Date
`

const typeDefs = [
  scalarDefinitions,
  queryDefinition,
  producerDefinition,
]

const resolvers = {
  ...scalarResolvers,
  Query: {
    ...producerResolver.root.Query,
  },
  Mutation: {
    ...producerResolver.root.Mutation,
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
