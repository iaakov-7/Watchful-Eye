import bcrypt from "bcrypt";

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
