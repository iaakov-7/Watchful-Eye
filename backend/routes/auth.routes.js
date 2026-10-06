import express from "express";
import { validBody } from "../middlewares/validBody.middleware.js";
import { loginSchema, userSchema } from "../schemas/user.schema.js";
import { userCtrls } from "../ctrls/auth.ctrls.js";
import { verifyRoles, verifyToken } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.post(
  "/register",
  validBody(userSchema),
  verifyToken,
  verifyRoles(["admin"]),
  userCtrls.handleRegister,
);

router.post("/login", validBody(loginSchema), userCtrls.handleLogin);

router.get("/me", verifyToken, userCtrls.handleGetMe);

router.delete(
  "/:id",
  verifyToken,
  verifyRoles(["admin"]),
  userCtrls.handleDeleteUser,
);

router.get("/", verifyToken, verifyRoles(["admin"]), userCtrls.handleGetAll);

router.post("/logout", verifyToken, userCtrls.handleLogout);
