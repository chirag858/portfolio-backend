import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";

import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contact";
import projectRoutes from "./routes/projects";
import experienceRoutes from "./routes/experience";
import githubRoutes from "./routes/github";
import blogRoutes from "./routes/blog";
import analyticsRoutes from "./routes/analytics";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);
