import Product from './model'

const resolver = {
  Mutation: {
    createProduct(_, { product }) {
      return Product.create(product)
    },
  },
}

export default resolver
