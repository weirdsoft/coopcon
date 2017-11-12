import mongoose from 'mongoose'

const ProducerSchema = mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },

})

ProducerSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'producer',
  justOne: false,
})

const Producer = mongoose.model('Producer', ProducerSchema)

export default Producer
