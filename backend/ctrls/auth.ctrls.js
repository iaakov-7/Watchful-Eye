import { usersRepo } from "../repository/users.repo.js";
import {
  CheckIfValidPassword,
  createHasedPassword,
  generateToken,
} from "../utils.js";

async function handleRegister(req, res) {
  const { username, password, email, role, assignedArena } = req.body;
  const user = await usersRepo.findByUserName(username);
  if (user) {
    const error = new Error(`Is already exists username: ${username}`);
    error.statusCode = 409;
    throw error;
  }
  const newHashedPassword = await createHasedPassword(password.trim());
  const userCreated = await usersRepo.insertUser({
    username: username.trim(),
    hashedPassword: newHashedPassword,
    email,
    role,
    assignedArena,
  });
  const { hashedPassword, ...safeUser } = userCreated;
  res.status(201).json({ success: true, data: safeUser });
}

async function handleLogin(req, /** @type {import("express").Response} */ res) {
  const { username, password } = req.body;
  const user = await usersRepo.findByUserName(username.trim());
  await CheckIfValidPassword(password.trim(), user.hashedPassword);
  const { hashedPassword, ...safeUser } = user;
  const token = generateToken(safeUser);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ success: true, data: safeUser });
}

async function handleGetMe(req, res) {
  const user = req.user;
  console.log(user);
  res.json({ success: true, data: user });
}

async function handleDeleteUser(req, res) {
  const { id } = req.params;
  const user = await usersRepo.findById(id);
  if (!user) {
    const error = new Error(`User with id: ${id} is not found`);
    error.statusCode = 404;
    throw error;
  }
  const result = await usersRepo.deleteUser(id);
  res.json({ success: true, data: result });
}

export const userCtrls = {
  handleRegister,
  handleLogin,
  handleGetMe,
  handleDeleteUser,
};
