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
          R.map(([ id, quantities ]) => {
            // we only have a product id, get the actual product
            const product = products[id]

            return {
              name: product.name,
              unit: product.unit,
              totals: R.compose(
                R.map(([ quantity, group ]) => ({
                  quantity,
                  total: group.length,
                })),
                R.toPairs,
                R.groupBy(R.toString), // group quantities
                R.chain((quantity) => R.compose(
                  R.when( // for fractional quantities, separate the fraction
                    R.always(R.gt(R.modulo(quantity, 1), 0)),
                    R.append(R.modulo(quantity, 1)),
                  ),
                  R.when( // for quantities > 1, separate the integer part into N quantities
                    R.always(R.gte(quantity, 1)),
                    R.concat(R.repeat(
                      1,
                      R.subtract(R.divide(quantity, 1), R.modulo(quantity, 1)),
                    )),
                  ),
                )([])), // normalize quantities into values <= 1
              )(quantities),
            }
          }),
          R.toPairs,
          R.map(R.pluck('quantity')), // for each product, leave only the quantity
          R.groupBy(R.prop('product')), // group by product
          R.chain(R.prop('products')), // pluck all products and put them into a single array
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
