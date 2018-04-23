import Operation from './model'

const resolver = {
  Query: {
    operations() {
      return Operation.find().exec()
    },
    operation(_, { id }) {
      return Operation.findById(id).exec()
    },
  },
  Mutation: {
    createOperation(_, { operation }) {
      return Operation.create(operation)
    },
    addOperationProduct(_, { id, productId }) {
      return Operation
        .findByIdAndUpdate(id, { $addToSet: { products: productId } })
        .exec()
    },
    removeOperationProduct(_, { id, productId }) {
      return Operation
        .findByIdAndUpdate(id, { $pull: { products: productId } })
        .exec()
    },
  },
  Nested: {
    Operation: {
      async producer(operation) {
        await operation.populate('producer').execPopulate()
        return operation.producer
      },
      async products(operation) {
        await operation.populate('products').execPopulate()
        return operation.products
      },
      async orders(operation) {
        await operation.populate({
          path: 'orders',
          populate: {
            path: 'products.product',
          },
        }).execPopulate()
        return operation.orders
      },
    },
  },
}

export default resolver
