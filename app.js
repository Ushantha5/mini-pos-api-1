import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import customerRoutes from "./routes/customerRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(express.json());

// db connection
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("DB Connected Successfully!"));
  } catch (error) {
    console.error("DB Connection Error:", error.message);
  }
};
connectDB();

// Use routes
app.use("/api/customers", customerRoutes);
app.use("/api/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
