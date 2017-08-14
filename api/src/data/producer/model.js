import mongoose from 'mongoose'

const ProducerSchema = mongoose.Schema({
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
})

const Producer = mongoose.model('Producer', ProducerSchema)

export default Producer
