// mongoose
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected successfully!')
  } catch (error) {
    console.log(error.message)
    process.exit(1) // terminate the exit mongodb connection
  }
}

export default connectDB
