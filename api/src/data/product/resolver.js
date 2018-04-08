import Product from './model'

const resolver = {
  Mutation: {
    createProduct(_, { product }) {
      return Product.create(product)
    },
    editProduct(_, { id, product }) {
      return Product.findOneAndUpdate({ _id: id }, product, { new: true })
    },
  },
}

export default resolver
