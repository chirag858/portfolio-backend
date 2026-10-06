import { z } from "zod";

export const pageViewSchema = z.object({
  path: z.string().min(1),
  referrer: z.string().optional(),
});
