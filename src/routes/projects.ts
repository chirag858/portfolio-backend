import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { projectSchema, projectUpdateSchema } from "../validators/project";
import { Project } from "../models/Project";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const data = projectSchema.parse(req.body);
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

router.put("/:slug", requireAuth, async (req, res, next) => {
  try {
    const data = projectUpdateSchema.parse(req.body);
    const project = await Project.findOneAndUpdate({ slug: req.params.slug }, data, { new: true });
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.delete("/:slug", requireAuth, async (req, res, next) => {
  try {
    const result = await Project.findOneAndDelete({ slug: req.params.slug });
    if (!result) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
