import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      `\nMongoDB connected successfully,DB Host : ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log(`ERROR : MongoDB Connection Error , ${err}`);
    process.exit(1);
  }
};
