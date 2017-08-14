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
}

export default resolver
