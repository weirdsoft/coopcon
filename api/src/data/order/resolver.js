import * as R from 'ramda'
import mongoose from 'mongoose'
import Order from './model'
import Product from '../product/model'

const resolver = {
  Mutation: {
    createOrder(_, { order }) {
      return Order.create(order)
    },
    deleteOrder(_, { id }) {
      return Order.findByIdAndDelete(id).exec()
    },
    async addOrderProduct(_, { id, orderProduct }) {
      const count = await Product.find({ _id: orderProduct.product }).count().exec()

      if (count === 0) {
        throw 'The product does not exist'
      }

      const productId = mongoose.Types.ObjectId(orderProduct.product)
      const order = await Order.findById(id).exec()
      let product = R.find(R.propEq('product', productId))(order.products)

      if (R.isNil(product)) {
        order.products.push({ product: productId, quantity: orderProduct.quantity })
        product = R.last(order.products)
      } else {
        product.quantity += orderProduct.quantity
      }

      await order.save()
      await order.populate({
        path: 'products.product',
        match: { _id: productId },
      }).execPopulate()
      return product
    },
    async removeOrderProduct(_, { id, orderProduct }) {
      const count = await Product.find({ _id: orderProduct.product }).count().exec()

      if (count === 0) {
        throw 'The product does not exist'
      }

      const productId = mongoose.Types.ObjectId(orderProduct.product)
      const order = await Order.findById(id).exec()
      let product = R.find(R.propEq('product', productId))(order.products)

      if (product.quantity > orderProduct.quantity) {
        product.quantity -= orderProduct.quantity
      } else {
        product.quantity = 0
        order.products = R.reject(R.equals(product))(order.products)
      }

      await order.save()
      return product
    },
    async toggleOrderPaid(_, { id }) {
      const order = await Order.findById(id).exec()
      order.paid = !order.paid

      return order.save()
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
