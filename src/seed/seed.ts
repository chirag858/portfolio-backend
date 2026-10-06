import { connectDB } from "../config/db";
import { Project } from "../models/Project";
import { ExperienceEntry } from "../models/ExperienceEntry";
import { GithubProfile } from "../models/GithubProfile";
import { projectsSeed, experienceSeed, githubSeed } from "./data";
import mongoose from "mongoose";

async function seed() {
  await connectDB();

  await Project.deleteMany({});
  await Project.insertMany(projectsSeed);

  await ExperienceEntry.deleteMany({});
  await ExperienceEntry.insertMany(experienceSeed);

  await GithubProfile.deleteMany({});
  await GithubProfile.create(githubSeed);

  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
