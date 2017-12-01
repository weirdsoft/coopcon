import mongoose from 'mongoose'

const OperationSchema = mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  publishDate: { type: Date, default: Date.now },
  closeDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' },
  products: {
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ],
    required: true,
  },
})

const Operation = mongoose.model('Operation', OperationSchema)

export default Operation
