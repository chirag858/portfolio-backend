import { Schema, model } from "mongoose";

const blogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export const BlogPost = model("BlogPost", blogPostSchema);
