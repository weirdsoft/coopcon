import Producer from './model'

const resolver = {
  Query: {
    producers() {
      return Producer.find().exec()
    },
    producer(_, { id }) {
      return Producer.findById(id).exec()
    },
  },
  Mutation: {
    createProducer(_, { producer }) {
      return Producer.create(producer)
    },
  },
  Nested: {
    Producer: {
      async products(producer) {
        await producer.populate('products').execPopulate()
        return producer.products
      },
      async operations(producer) {
        await producer.populate('operations').execPopulate()
        return producer.operations
      },
    },
  },
}

export default resolver
