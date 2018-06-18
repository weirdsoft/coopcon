import mongoose from 'mongoose'

export const ROLES = {
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin',
}

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
  role: { type: String, default: ROLES.USER, enum: [ ROLES.USER, ROLES.ADMIN ] },
})

const User = mongoose.model('User', UserSchema)

export default User
