import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/blinkit`);
    console.log("Database Connected");
  } catch (error) {
    console.log(`Database Error  = ${error}`);
    process.exit(1);
  }
};

export default connectDB;
