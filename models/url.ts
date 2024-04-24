import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  urlCode: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['custom', 'random'] },
  date: { type: Date, default: Date.now() },
  age: { type: Date, default: Date.now() + 600000 }, // 10 minutes in milliseconds
});

const URL = mongoose.models.URL || mongoose.model("URL", UrlSchema);

export { URL };
