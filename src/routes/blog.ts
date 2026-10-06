import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { blogPostSchema, blogPostUpdateSchema } from "../validators/blog";
import { BlogPost } from "../models/BlogPost";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ publishedAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const data = blogPostSchema.parse(req.body);
    const post = await BlogPost.create(data);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.put("/:slug", requireAuth, async (req, res, next) => {
  try {
    const data = blogPostUpdateSchema.parse(req.body);
    const post = await BlogPost.findOneAndUpdate({ slug: req.params.slug }, data, { new: true });
    if (!post) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete("/:slug", requireAuth, async (req, res, next) => {
  try {
    const result = await BlogPost.findOneAndDelete({ slug: req.params.slug });
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
