import Operation from './model'

const resolver = {
  Mutation: {
    createOperation(_, { operation }) {
      return Operation.create(operation)
    },
  },
  Nested: {
    Operation: {
      async products(operation) {
        await operation.populate('products').execPopulate()
        return operation.products
      },
    },
  },
}

export default resolver
