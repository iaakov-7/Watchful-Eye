import * as z from "zod";

export const alertSchema = z.object({
  displayName: z.string(),
  description: z.string(),
  priority: z.enum(),
  arena: z.enum(),
  status: z.enum(),
  lon: z.number(),
  lat: z.number(),
});
