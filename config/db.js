import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Coecting...");
  } catch (error) {
    console.error(error.massage);
    process.exit(1);
  }
};

 connectDB();


export default connectDB;
