import * as z from "zod";

export const userSchema = z.object({
  username: z.string(
    "The field username is required and must be of type string.",
  ),
  password: z.string(
    "The field password is required and must be of type string.",
  ),
  email: z.email("The field email is required and must be of type email."),
  role: z.enum(
    ["arena_user", "general_user", "admin"],
    "The `role` field is required and must be one of the following: arena_user, general_user,admin or All",
  ),
  assignedArena: z.enum(
    ["North", "South", "Center", "All"],
    "The `assignedArena` field is required and must be one of the following: North, South,Center or All",
  ),
});
