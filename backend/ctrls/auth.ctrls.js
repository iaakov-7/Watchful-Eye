import { usersRepo } from "../repository/users.repo.js";
import { createHasedPassword } from "../utils.js";

async function handleRegister(req, res) {
  const { username, password, email, role, assignedArena } = req.body;
  const hashedPassword = await createHasedPassword(password);
  const userCreated = await usersRepo.insertUser({
    username,
    hashedPassword,
    email,
    role,
    assignedArena,
  });
  res.status(201).json({ success: true, data: userCreated });
}

export const userCtrls = { handleRegister };
