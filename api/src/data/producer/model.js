import mongoose from 'mongoose'

const ProducerSchema = mongoose.Schema({
  name: { type: String, required: true },
})

const Producer = mongoose.model('Producer', ProducerSchema)

export default Producer
