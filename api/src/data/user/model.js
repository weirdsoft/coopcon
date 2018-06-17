import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
})

const User = mongoose.model('User', UserSchema)

export default User
