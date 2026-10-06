import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { githubProfileSchema, githubProfileUpdateSchema } from "../validators/github";
import { GithubProfile } from "../models/GithubProfile";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const profile = await GithubProfile.findOne();
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

router.put("/", requireAuth, async (req, res, next) => {
  try {
    const existing = await GithubProfile.findOne();
    if (!existing) {
      const data = githubProfileSchema.parse(req.body);
      const created = await GithubProfile.create(data);
      res.status(201).json(created);
      return;
    }
    const data = githubProfileUpdateSchema.parse(req.body);
    Object.assign(existing, data);
    await existing.save();
    res.json(existing);
  } catch (err) {
    next(err);
  }
});

export default router;
