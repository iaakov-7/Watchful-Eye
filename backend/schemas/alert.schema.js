import * as z from "zod";

export const alertSchema = z.object({
  displayName: z.string(
    "The field displayName is required and must be of type string.",
  ),
  description: z.string(
    "The field description is required and must be of type string.",
  ),
  priority: z.enum(
    ["Low", "Medium", "High", "Critical"],
    "The 'priority' field is required and must be one of the following: Low, Medium, High, or Critical.",
  ),
  arena: z.enum(
    ["North", "South", "Center"],
    "The `arena` field is required and must be one of the following: North, South, or Center.",
  ),
  status: z.enum(
    ["Active", "Handled"],
    "The `status` field is required and must be Active, or Handled.",
  ),
  lon: z.number("The field `lon` is required and must be of type number"),
  lat: z.number("The field `lat` is required and must be of type number"),
});

export const alertSchemaForUpdate = alertSchema.partial().optional();
