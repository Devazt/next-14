import mongoose, { Mongoose } from "mongoose";

const connection: any = {};

export default async function connectDB() {
  try {
    if (connection.isConnected) {
      console.log("Using existing database connection");
      return;
    }
    const db: any = await mongoose.connect(process.env.MONGO ?? "");
    connection.isConnected = db.connection["readyState"] === 1;
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to connect to database");
  }
}
