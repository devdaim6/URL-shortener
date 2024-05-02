import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  urlCode: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ["custom", "random"] },
  date: { type: Date, default: Date.now() },
  linkExpiration: {
    type: Date,
    default: () => Date.now() + 30 * 24 * 60 * 60 * 1000,
  },
  password: { type: String, default: "" },
  clicks: { type: Number, default: 0 },
  lastAccessed: { type: Date, default: Date.now() },
  ratelimit: {
    type: [
      {
        ip: { type: String, required: true, unique: true },
        limit: { type: Number, default: 10 },
        lastAccessed: { type: Date },
      },
    ],
    default: [],
  },
});

const URL = mongoose.models.URL || mongoose.model("URL", UrlSchema);

export { URL };
