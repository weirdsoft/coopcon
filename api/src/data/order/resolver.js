import * as R from 'ramda'
import mongoose from 'mongoose'
import Order from './model'
import Product from '../product/model'

const resolver = {
  Mutation: {
    createOrder(_, { order }) {
      return Order.create(order)
    },
    async addOrderProduct(_, { id, productId, quantity }) {
      const count = await Product.find({ _id: productId }).count().exec()

      if (count === 0) {
        throw 'The product does not exist'
      }

      productId = mongoose.Types.ObjectId(productId)
      const order = await Order.findById(id).exec()
      let product = R.find(R.propEq('product', productId), order.products)

      if (R.isNil(product)) {
        order.products.push({ product: productId, quantity })
        product = R.last(order.products)
      } else {
        product.quantity = quantity
      }

      await order.save()
      await order.populate({
        path: 'products.product',
        match: { _id: productId },
      }).execPopulate()
      return product
    },
    async removeOrderProduct(_, { id, productId, quantity }) {
      const order = await Order.findById(id).exec()
      let product = R.find(R.propEq('product', productId), order.products)

      if (product.quantity < quantity) {
        product.quantity -= quantity
      } else {
        product.remove()
        product = null
      }

      await order.save()
      return product
    },
  },
  Nested: {
    Order: {
      async operation(order) {
        await order.populate('operation').execPopulate()
        return order.operation
      },
    },
  },
}

export default resolver
