import mongoose from 'mongoose'

const OrderProductSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
}, { _id: false })

const OrderSchema = mongoose.Schema({
  user: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  operation: { type: mongoose.Schema.Types.ObjectId, ref: 'Operation' },
  products: [ OrderProductSchema ],
  paid: { type: Boolean, default: false },
})

const Order = mongoose.model('Order', OrderSchema)

export default Order
