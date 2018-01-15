import Operation from './model'

const resolver = {
  Query: {
    operation(_, { id }) {
      return Operation.findById(id).exec()
    },
  },
  Mutation: {
    createOperation(_, { operation }) {
      return Operation.create(operation)
    },
    setOperationProducts(_, { operation }) {
      return Operation
        .findByIdAndUpdate(operation.id, { $set: { products: operation.products } }, { new: true })
        .exec()
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
