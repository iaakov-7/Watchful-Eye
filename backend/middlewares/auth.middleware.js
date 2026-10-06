import JWT from "jsonwebtoken";

export function verifyToken(
  /**@type {import("express").Request}*/ req,
  res,
  next,
) {
  const token = req.cookies.token;
  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    const error = new Error("Invalid token");
    error.statusCode = 401;
    throw error;
  }
}

export function verifyRoles(roles) {
  return function (req, res, next) {
    const user = req.user;
    if (!roles.includes(user.role)) {
      const error = new Error(
        "You do not hold the role required to receive this permission",
      );
      error.statusCode = 403;
      throw error;
    } else {
      next();
    }
  };
}
