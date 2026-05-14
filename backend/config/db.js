/* eslint-disable no-undef */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const conn = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
      return;
    } catch (error) {
      retries++;
      console.error(
        `DB Error (Attempt ${retries}/${maxRetries}):`,
        error.message
      );
      if (retries < maxRetries) {
        console.log(`Retrying in 2 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        console.error(
          "❌ Failed to connect to MongoDB after maximum retries."
        );
        console.error(
          "⚠️  Make sure MongoDB is running on: " + mongoURI
        );
        process.exit(1);
      }
    }
  }
};

export default connectDB;