import * as R from 'ramda'
import Order from './model'

const resolver = {
  Mutation: {
    createOrder(_, { order }) {
      return Order.create(order)
    },
    async addOrderProduct(_, { id, productId, quantity }) {
      const order = await Order.findById(id).exec()
      order.products.push({ product: productId, quantity })
      const product = R.last(order.products)

      await order.save()
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
