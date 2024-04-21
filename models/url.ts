import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  urlCode: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now() },
});

const URL = mongoose.models.URL || mongoose.model("URL", UrlSchema);

export default URL;
