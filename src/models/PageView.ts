import { Schema, model } from "mongoose";

const pageViewSchema = new Schema(
  {
    path: { type: String, required: true },
    referrer: { type: String },
    userAgent: { type: String },
    ipHash: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const PageView = model("PageView", pageViewSchema);
