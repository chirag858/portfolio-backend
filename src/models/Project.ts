import { Schema, model } from "mongoose";

const challengeSchema = new Schema(
  { title: { type: String, required: true }, detail: { type: String, required: true } },
  { _id: false }
);

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    kind: { type: String, required: true },
    status: { type: String, enum: ["production", "in-progress", "archived"], required: true },
    summary: { type: String, required: true },
    role: { type: String, required: true },
    featured: { type: Boolean, default: false },
    tech: { type: [String], default: [] },
    links: {
      github: { type: String },
      live: { type: String },
    },
    overview: { type: String, required: true },
    problem: { type: String, required: true },
    contribution: { type: [String], default: [] },
    challenges: { type: [challengeSchema], default: [] },
    solution: { type: String, required: true },
    features: { type: [String], default: [] },
    architecture: { type: [String], default: [] },
    outcome: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = model("Project", projectSchema);
