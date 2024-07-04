import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// write user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reset_password_token: { type: String },
  reset_password_expiration: { type: Date },
})

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  // hash#
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// match password
userSchema.methods.matchPassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password)
}

// Create user model
const User = mongoose.model('User', userSchema)

export default User
