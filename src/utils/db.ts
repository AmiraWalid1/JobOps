import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  const mongoDb: string = process.env.MONGO_URI || '';

  try {
    await mongoose.connect(mongoDb);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('DB Connection Error:', error);
    throw new Error('DB Connection Error');
  }
};
