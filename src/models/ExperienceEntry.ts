import { Schema, model } from "mongoose";

const experienceEntrySchema = new Schema(
  {
    period: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    points: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ExperienceEntry = model("ExperienceEntry", experienceEntrySchema);
