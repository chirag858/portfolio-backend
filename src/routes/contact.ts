import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { publicWriteLimiter } from "../middleware/rateLimiter";
import { contactSchema } from "../validators/contact";
import { ContactSubmission } from "../models/ContactSubmission";
import { sendContactNotification } from "../config/mailer";

const router = Router();

router.post("/", publicWriteLimiter, async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);
    const submission = await ContactSubmission.create(data);
    res.status(201).json(submission);

    sendContactNotification(data).catch((err) => {
      console.error("Failed to send contact notification email:", err);
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", requireAuth, async (_req, res, next) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
});

export default router;
