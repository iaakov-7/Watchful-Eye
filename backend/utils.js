import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export function raisErrorIfNotFound(alert, id) {
  if (!alert) {
    const error = new Error(`Alert with id ${id} is not found`);
    error.statusCode = 404;
    throw error;
  }
}

export async function createHasedPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function CheckIfValidPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  if (!isValid) {
    const error = new Error("Invalid password");
    error.statusCode = 400;
    throw error;
  }
}

export function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    role:user.role
  };
  const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
}
