import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sku: { type: String, unique: true, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
  category: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Item", itemSchema);
