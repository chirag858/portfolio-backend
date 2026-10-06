import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { experienceSchema, experienceUpdateSchema } from "../validators/experience";
import { ExperienceEntry } from "../models/ExperienceEntry";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const entries = await ExperienceEntry.find().sort({ order: 1 });
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const data = experienceSchema.parse(req.body);
    const entry = await ExperienceEntry.create(data);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const data = experienceUpdateSchema.parse(req.body);
    const entry = await ExperienceEntry.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!entry) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(entry);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const result = await ExperienceEntry.findByIdAndDelete(req.params.id);
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
