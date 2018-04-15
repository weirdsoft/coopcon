import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  minimalFraction: { type: Number, required: true },
  price: { type: Number, required: true },
  creationDate: { type: Date, default: Date.now },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' },
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
