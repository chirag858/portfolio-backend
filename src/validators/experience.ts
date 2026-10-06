import { z } from "zod";

export const experienceSchema = z.object({
  period: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  points: z.array(z.string()).default([]),
  order: z.number().default(0),
});

export const experienceUpdateSchema = experienceSchema.partial();
