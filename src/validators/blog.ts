import { z } from "zod";

export const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  publishedAt: z.coerce.date().optional(),
});

export const blogPostUpdateSchema = blogPostSchema.partial();
