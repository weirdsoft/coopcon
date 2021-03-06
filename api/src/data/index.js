import * as R from 'ramda'
import { makeExecutableSchema } from 'graphql-tools'
import { withAuth } from 'auth'
import scalarResolvers from './scalars'
import { ROLES, userDefinition, userResolver } from './user'
import { producerDefinition, producerResolver } from './producer'
import { productDefinition, productResolver } from './product'
import { operationDefinition, operationResolver } from './operation'
import { orderDefinition, orderResolver } from './order'

const queryDefinition = `
  type Query {
    me: User!
    producers: [Producer]!
    producer(id: ID!): Producer
    operations: [Operation]!
    operation(id: ID!): Operation
  }

  type Mutation {
    createProducer(producer: ProducerInput!): Producer!
    createProduct(product: ProductInput!): Product!
    editProduct(id: ID!, product: ProductInput!): Product!
    createOperation(operation: OperationInput!): Operation!
    updateOperation(id: ID!, operation: OperationInput!): Operation!
    addOperationProduct(id: ID!, productId: ID!): Boolean!
    removeOperationProduct(id: ID!, productId: ID!): Boolean!
    createOrder(order: OrderInput!): Order!
    deleteOrder(id: ID!): Order!
    addOrderProduct(id: ID!, orderProduct: OrderProductInput): OrderProduct!
    removeOrderProduct(id: ID!, orderProduct: OrderProductInput): OrderProduct
    toggleOrderPaid(id: ID!): Order!
  }
`

const scalarDefinitions = `
  scalar Date
`

const typeDefs = [
  scalarDefinitions,
  queryDefinition,
  userDefinition,
  producerDefinition,
  productDefinition,
  operationDefinition,
  orderDefinition,
]

const withAdminAuth = R.partial(withAuth, [ ROLES.ADMIN ])
const mergeWithAdminAuth = R.compose(
  R.map(withAdminAuth),
  R.mergeAll,
)

const resolvers = R.reduce(R.mergeDeepRight, {}, [
  scalarResolvers,
  userResolver,
  {
    Query: mergeWithAdminAuth([
      producerResolver.Query,
      operationResolver.Query,
    ]),
    Mutation: mergeWithAdminAuth([
      producerResolver.Mutation,
      productResolver.Mutation,
      operationResolver.Mutation,
      orderResolver.Mutation,
    ]),
  },
  producerResolver.Nested,
  operationResolver.Nested,
  orderResolver.Nested,
])

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }
