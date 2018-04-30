import * as R from 'ramda'
import Product from '../product/model'
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
      async totals(operation) {
        await operation.populate('orders').execPopulate()
        const products = R.indexBy(R.prop('_id'))(
          await Product.find({ producer: operation.producer }),
        )

        return R.compose(
          R.map(([ id, value ]) => {
            const product = products[id]

            return {
              name: product.name,
              unit: product.unit,
              totals: R.compose(
                R.map(([ quantity, orders ]) => ({
                  quantity: quantity * product.quantity,
                  total: orders.length,
                })),
                R.toPairs,
                R.map(R.chain(R.identity)),
              )(value),
            }
          }),
          R.toPairs,
          R.map(R.groupBy(R.prop('quantity'))),
          R.groupBy(R.prop('product')),
          R.chain(R.prop('products')),
        )(operation.orders)
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
