import Producer from './model'

const resolver = {
  root: {
    Query: {
      producers() {
        return Producer.find().exec()
      },
    },
    Mutation: {
      createProducer(_, { producer }) {
        return Producer.create(producer)
      },
    },
  },
}

export default resolver
