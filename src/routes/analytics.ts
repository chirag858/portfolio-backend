import { Router } from "express";
import crypto from "crypto";
import { requireAuth } from "../middleware/auth";
import { publicWriteLimiter } from "../middleware/rateLimiter";
import { pageViewSchema } from "../validators/pageview";
import { PageView } from "../models/PageView";
import { env } from "../config/env";

const router = Router();

function hashIp(ip: string): string {
  return crypto.createHmac("sha256", env.jwtSecret).update(ip).digest("hex");
}

router.post("/pageview", publicWriteLimiter, async (req, res, next) => {
  try {
    const data = pageViewSchema.parse(req.body);
    await PageView.create({
      path: data.path,
      referrer: data.referrer,
      userAgent: req.headers["user-agent"],
      ipHash: hashIp(req.ip ?? ""),
    });
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.get("/summary", requireAuth, async (_req, res, next) => {
  try {
    const summary = await PageView.aggregate([
      {
        $group: {
          _id: { path: "$path", day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.day": -1 } },
    ]);
    res.json(summary);
  } catch (err) {
    next(err);
  }
});

export default router;
