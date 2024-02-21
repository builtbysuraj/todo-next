import { ENV } from '@/conf'
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URL)
    console.log('MongoDB connected')
  } catch (error) {
    console.log('MongoDB connection FAILED ', error)
  }
}

export default connectDB
