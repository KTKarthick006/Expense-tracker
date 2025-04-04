import mongoose from "mongoose";
import {config} from "dotenv";
config();
export const connectDB = async () => {
    console.log(process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};