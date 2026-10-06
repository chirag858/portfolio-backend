import { Schema, model } from "mongoose";

const repoSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String },
    href: { type: String, required: true },
  },
  { _id: false }
);

const githubProfileSchema = new Schema(
  {
    profile: { type: String, required: true },
    handle: { type: String, required: true },
    leetcode: { type: String },
    blurb: { type: String, required: true },
    repos: { type: [repoSchema], default: [] },
    highlights: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const GithubProfile = model("GithubProfile", githubProfileSchema);
