import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  kind: z.string().min(1),
  status: z.enum(["production", "in-progress", "archived"]),
  summary: z.string().min(1),
  role: z.string().min(1),
  featured: z.boolean().default(false),
  tech: z.array(z.string()).default([]),
  links: z.object({ github: z.string().optional(), live: z.string().optional() }).default({}),
  overview: z.string().min(1),
  problem: z.string().min(1),
  contribution: z.array(z.string()).default([]),
  challenges: z.array(z.object({ title: z.string(), detail: z.string() })).default([]),
  solution: z.string().min(1),
  features: z.array(z.string()).default([]),
  architecture: z.array(z.string()).default([]),
  outcome: z.string().min(1),
  order: z.number().default(0),
});

export const projectUpdateSchema = projectSchema.partial();
