import mongoose from "mongoose";

const URI = process.env.MONGODB_URL!;

const connectDB = async () => {
  try {
    const conn_db = await mongoose.connection.readyState;

    if (conn_db === 1) {
      console.log(`Database is connecting...`);
    }
    if (conn_db === 2) {
      console.log("Database is already Connected");
    } else {
      const conn = await mongoose.connect(URI);
      console.log(`Database is connected: ${conn.connection.host}`);
    }
  } catch (err: any) {
    console.log(`Failed to Connect Database: Error: ${err.message}`);
  }
};

export default connectDB;
