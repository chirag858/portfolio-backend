import { z } from "zod";

export const githubProfileSchema = z.object({
  profile: z.string().min(1),
  handle: z.string().min(1),
  leetcode: z.string().optional(),
  blurb: z.string().min(1),
  repos: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        language: z.string().optional(),
        href: z.string(),
      })
    )
    .default([]),
  highlights: z.array(z.string()).default([]),
});

export const githubProfileUpdateSchema = githubProfileSchema.partial();
