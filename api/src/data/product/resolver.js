import Product from './model'

const resolver = {
  Producer: {
    products(producer) {
      return Product.find({ producer: producer._id }).exec()
    },
  },
}

export default resolver
