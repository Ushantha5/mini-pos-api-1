import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  phone: { type: String, required: true },
  address: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Customer", customerSchema);
