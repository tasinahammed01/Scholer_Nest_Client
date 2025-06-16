import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongooseInstance) => {
        return mongooseInstance.connection;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (error) {
    throw error;
  }
  return cached!.conn;
}

export default connectToDatabase;
